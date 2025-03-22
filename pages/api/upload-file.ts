import { storage } from '../../firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface UploadResponse {
  success: boolean;
  url?: string;
  fileName?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const form = new formidable.IncomingForm();
    
    // Fix the Promise type definition
    const [fields, files] = await new Promise<[Fields, Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Get the file from the request
    const file = files.file as formidable.File;
    if (!file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    // Generate a unique filename
    const timestamp = Date.now();
    const originalName = file.originalFilename || 'file';
    const fileName = `uploads/${timestamp}-${originalName}`;

    // Read the file
    const fileBuffer = await fs.readFile(file.filepath);

    // Get bucket reference
    const bucket = storage.bucket();
    const fileRef = bucket.file(fileName);

    // Upload file to Firebase Storage
    await fileRef.save(fileBuffer, {
      metadata: {
        contentType: file.mimetype,
        metadata: {
          originalName: file.originalFilename,
          uploadedAt: new Date().toISOString()
        }
      }
    });

    // Make the file publicly accessible
    await fileRef.makePublic();

    // Get the public URL
    const publicUrl = fileRef.publicUrl();

    return res.status(200).json({
      success: true,
      url: publicUrl,
      fileName: fileName
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to upload file'
    });
  }
} 