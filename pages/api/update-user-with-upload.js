import { db, storage } from '../../firebase/admin';
import formidable from 'formidable';
import { promises as fs } from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const form = new formidable.IncomingForm();
        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve([fields, files]);
            });
        });

        const userDetails = JSON.parse(fields.userDetails);

        if (!userDetails || !userDetails.mobileNumber) {
            return res.status(400).json({ error: 'User details with mobile number are required' });
        }

        const applicantDoc = await db.collection('instaloan-applicants')
            .where('mobileNumber', '==', userDetails.mobileNumber)
            .get();

        if (applicantDoc.empty) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Handle file uploads
        const fileArray = Object.values(files);
        const uploadPromises = fileArray.map(async (file, index) => {
            const fileName = `salary-slips/${userDetails.mobileNumber}/slip-${index+1}`;
            const fileBuffer = await fs.readFile(file.filepath);
            
            const bucket = storage.bucket();
            const fileRef = bucket.file(fileName);
            
            await fileRef.save(fileBuffer, {
                metadata: {
                    contentType: file.mimetype
                }
            });

            await fileRef.makePublic();

            return {
                label: file.originalFilename || `Salary Slip ${index + 1}`,
                url: fileRef.publicUrl()
            };
        });

        const uploadedSlips = await Promise.all(uploadPromises);

        // Update user details with uploaded files
        const docId = applicantDoc.docs[0].id;
        const existingDoc = await db.collection('instaloan-applicants')
            .doc(docId)
            .get();
        
        const existingSlips = existingDoc.data().salarySlips || [
            { label: '', url: '' },
            { label: '', url: '' },
            { label: '', url: '' }
        ];

        uploadedSlips.forEach((slip, index) => {
            existingSlips[index] = slip;
        });

        userDetails.salarySlips = existingSlips;

        await db.collection('instaloan-applicants')
            .doc(docId)
            .update(userDetails);

        return res.json({ 
            message: 'User details and salary slips updated successfully',
            userDetails
        });
    } catch (error) {
        console.error('Error in update-user-with-upload:', error);
        res.status(500).json({ error: 'Failed to update user details and upload files' });
    }
} 