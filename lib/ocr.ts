import { createWorker } from 'tesseract.js';

export async function extractTextFromImage(imageBuffer: Buffer): Promise<string> {
  let worker;
  
  try {
    // Create a Tesseract worker
    worker = await createWorker('eng');
    
    // Convert buffer to base64 data URL for Tesseract
    const base64 = imageBuffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;
    
    // Perform OCR
    const { data: { text } } = await worker.recognize(dataUrl);
    
    // Clean up the extracted text
    const cleanedText = text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .trim();
    
    return cleanedText || 'No text detected in image';
    
  } catch (error) {
    console.error('OCR extraction failed:', error);
    return 'Failed to extract text from image';
  } finally {
    // Always terminate the worker
    if (worker) {
      await worker.terminate();
    }
  }
}
