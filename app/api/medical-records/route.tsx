import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { db } from '@/config/db';
import { MedicalRecordsTable, usersTable } from '@/config/schema';
import { openai } from '@/config/OpenAiModel';
import { currentUser } from '@clerk/nextjs/server';
import { eq, desc } from 'drizzle-orm';
import { extractTextFromImage } from '@/lib/ocr';
import { extractTextFromPDF } from '@/lib/pdf-parser';
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Ensure user exists in database
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }


    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'medical-records',
          public_id: `medical-record-${Date.now()}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const { secure_url, public_id, bytes: fileSize } = uploadResult as any;

    // Extract text content from the file (for PDFs, images, etc.)
    let extractedText = '';
    try {
      if (file.type === 'application/pdf') {
        // For PDF files, extract text using pdf-parse
        extractedText = await extractTextFromPDF(buffer);
      } else if (file.type.startsWith('text/')) {
        extractedText = buffer.toString('utf-8');
      } else if (file.type.startsWith('image/')) {
        // For images, use OCR to extract text
        extractedText = await extractTextFromImage(buffer);
      } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // For Word documents, we'll need a different approach
        // For now, return a placeholder
        extractedText = 'Word document text extraction not implemented yet';
      }
    } catch (error) {
      console.error('Error extracting text:', error);
      extractedText = 'Unable to extract text content';
    }

    // Generate AI summary
    let summary = '';
    if (extractedText && extractedText !== 'Unable to extract text content') {
      try {
        const completion = await openai.chat.completions.create({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a medical assistant. Summarize the following medical record in a clear, concise manner. Focus on key medical information, diagnoses, treatments, medications, and important dates. Keep the summary under 500 words."
            },
            {
              role: "user",
              content: extractedText
            }
          ],
          max_tokens: 1000,
          temperature: 0.3,
        });

        summary = completion.choices[0]?.message?.content || 'Unable to generate summary';
      } catch (error) {
        console.error('Error generating summary:', error);
        summary = 'Unable to generate summary';
      }
    }

    // Save to database
    const medicalRecord = await db.insert(MedicalRecordsTable).values({
      fileName: file.name,
      fileUrl: secure_url,
      fileType: file.type,
      fileSize: fileSize,
      summary: summary,
      originalContent: extractedText,
      createdBy: userEmail,
      createdOn: new Date().toISOString(),
    }).returning();

    return NextResponse.json({
      success: true,
      medicalRecord: medicalRecord[0],
      message: 'Medical record uploaded and processed successfully'
    });

  } catch (error) {
    console.error('Error uploading medical record:', error);
    return NextResponse.json(
      { error: 'Failed to upload medical record' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = user.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }

    // Get all medical records for the user
    const medicalRecords = await db
      .select()
      .from(MedicalRecordsTable)
      .where(eq(MedicalRecordsTable.createdBy, userEmail))
      .orderBy(desc(MedicalRecordsTable.createdOn));

    return NextResponse.json(medicalRecords);

  } catch (error) {
    console.error('Error fetching medical records:', error);
    return NextResponse.json(
      { error: 'Failed to fetch medical records' },
      { status: 500 }
    );
  }
}
