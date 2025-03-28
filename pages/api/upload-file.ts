import { storage } from '../../firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { createReadStream } from 'fs';
import path from 'path';

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
  timings?: any;
}

// Allowed file types and max size
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Pre-initialize bucket reference
const bucket = storage.bucket();

// Configure formidable options
const formidableConfig = {
  keepExtensions: true,
  maxFileSize: MAX_FILE_SIZE,
  multiples: false, // Disable multiple file uploads
  filter: ({ mimetype }: { mimetype?: string }) => {
    return mimetype ? ALLOWED_FILE_TYPES.includes(mimetype) : false;
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  const timings: any = {};
  const startTime = performance.now();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  console.log("New api ")

  try {
    console.log('Starting file upload process');
    
    // Initialize form
    const formStartTime = performance.now();
    const form = formidable(formidableConfig);
    timings.formInit = performance.now() - formStartTime;
    
    // Parse form
    const parseStartTime = performance.now();
    const [_, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err?.code === 'LIMIT_FILE_SIZE') {
          reject(new Error('File size too large. Maximum size is 5MB'));
        } else if (err?.code === 'INVALID_FILE_TYPE') {
          reject(new Error('Invalid file type. Allowed types: JPG, PNG, PDF'));
        } else if (err) {
          reject(err);
        }
        resolve([fields, files]);
      });
    });
    timings.formParse = performance.now() - parseStartTime;
    console.log('Form parsed:', timings.formParse, 'ms');

    const file = files.file as formidable.File;
    if (!file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    // Generate filename with public access token
    const timestamp = Date.now();
    const fileExt = path.extname(file.originalFilename || '').toLowerCase();
    const fileName = `uploads/${timestamp}${fileExt}`;

    // Optimize upload configuration
    const fileRef = bucket.file(fileName);
    const writeStream = fileRef.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        cacheControl: 'public, max-age=31536000',
        metadata: {
          originalName: file.originalFilename,
          uploadedAt: new Date().toISOString(),
          firebaseStorageDownloadTokens: timestamp.toString() // Pre-generate token
        }
      },
      public: true, // Make public during upload
      gzip: true,
      resumable: false
    });

    // Upload with optimized streaming
    const uploadStartTime = performance.now();
    await new Promise((resolve, reject) => {
      createReadStream(file.filepath)
        .pipe(writeStream)
        .on('error', reject)
        .on('finish', () => {
          timings.upload = performance.now() - uploadStartTime;
          console.log('File upload:', timings.upload, 'ms');
          resolve(null);
        });
    });

    // Get URL directly (no need to make public separately)
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    // Total time
    timings.total = performance.now() - startTime;
    console.log('Total time:', timings.total, 'ms');

    return res.status(200).json({
      success: true,
      url: publicUrl,
      fileName,
      timings // Include timings in response
    });

  } catch (error: any) {
    console.error('Error uploading file:', error);
    const errorTime = performance.now() - startTime;
    console.log('Error occurred after:', errorTime, 'ms');
    
    if (error.message.includes('size')) {
      return res.status(413).json({
        success: false,
        error: 'File size too large. Maximum size is 5MB',
        timings
      });
    }
    
    if (error.message.includes('type')) {
      return res.status(415).json({
        success: false,
        error: 'Invalid file type. Allowed types: JPG, PNG, PDF',
        timings
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to upload file',
      timings
    });
  }
} 