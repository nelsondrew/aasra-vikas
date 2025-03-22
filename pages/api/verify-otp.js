import { db, admin } from '../../firebase/admin';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
        return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    try {
        const otpDoc = await db.collection('otps').doc(phoneNumber).get();
        
        if (!otpDoc.exists) {
            return res.status(400).json({ error: 'No OTP found for this number' });
        }

        const otpData = otpDoc.data();

        // Check if OTP is expired (5 minutes)
        if (Date.now() - otpData.timestamp > 5 * 60 * 1000) {
            await db.collection('otps').doc(phoneNumber).delete();
            return res.status(400).json({ error: 'OTP has expired' });
        }

        if (otpData.otp === otp) {
            await db.collection('otps').doc(phoneNumber).delete();

            const initialApplicantData = {
                mobileNumber: phoneNumber,
                agreed: false,
                showOTP: false,
                isVerified: true,
                panNumber: "",
                isPanVerified: false,
                name: "",
                dob: "",
                isNameVerified: false,
                isDobVerified: false,
                aadhaarNumber: "",
                showAdditionalDetails: false,
                email: "",
                employmentType: "salaried",
                salary: "",
                showWorkDetails: false,
                workEmail: "",
                officeAddress: "",
                salarySlips: [
                    { label: '', url: '' },
                    { label: '', url: '' },
                    { label: '', url: '' }
                ],
                personalAddress: "",
                currentCity: "",
                currentLoans: "",
                stayingStatus: "",
                currentScreen: "verify",
                showPayment: false,
                showVerificationStatus: false
            };

            await db.collection('instaloan-applicants').add(initialApplicantData);

            return res.json({ 
                message: 'OTP verified successfully',
                userDetails: initialApplicantData
            });
        } else {
            await db.collection('otps').doc(phoneNumber).update({
                attempts: admin.firestore.FieldValue.increment(1)
            });
            return res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
} 