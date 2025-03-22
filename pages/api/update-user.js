import { db } from '../../firebase/admin';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userDetails } = req.body;
    
    if (!userDetails || !userDetails.mobileNumber) {
        return res.status(400).json({ error: 'User details with mobile number are required' });
    }

    try {
        const applicantDoc = await db.collection('instaloan-applicants')
            .where('mobileNumber', '==', userDetails.mobileNumber)
            .get();

        if (applicantDoc.empty) {
            return res.status(404).json({ error: 'User not found' });
        }

        const docId = applicantDoc.docs[0].id;
        await db.collection('instaloan-applicants')
            .doc(docId)
            .update(userDetails);

        return res.json({ 
            message: 'User details updated successfully',
            userDetails
        });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Failed to update user details' });
    }
} 