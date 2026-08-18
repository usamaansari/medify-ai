// Dynamic import for pdf-parse to avoid Next.js build issues
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Try to use pdf-parse with dynamic import
    const pdf = (await import('pdf-parse')).default;
    
    const pdfData = await pdf(buffer);
    return pdfData.text || 'No text found in PDF';
  } catch (error) {
    console.error('PDF parsing failed:', error);
    
    // Fallback: Return a message indicating PDF processing is not available
    // In a production environment, you might want to use a cloud-based PDF parsing service
    return 'PDF text extraction is temporarily unavailable. Please try uploading as an image or text file.';
  }
}
