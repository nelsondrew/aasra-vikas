import { db } from '../../firebase/admin';
import { generateOTP } from '../../utils/otpHelper';
import twilio from 'twilio';

// Initialize Twilio client
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { phoneNumber } = req.body;
    
    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        // Check if user exists in instaloan-applicants collection
        const applicantDoc = await db.collection('instaloan-applicants')
            .where('mobileNumber', '==', phoneNumber)
            .get();

        // If user exists and is verified, return success without generating OTP
        if (!applicantDoc.empty) {
            const applicantData = applicantDoc.docs[0].data();
            if (applicantData.isVerified === true) {
                return res.json({ 
                    message: 'OTP verified successfully',
                    userDetails: applicantData
                });
            }
        }

        const otp = generateOTP();
        const timestamp = Date.now();
        
        // Store OTP in Firestore
        await db.collection('otps').doc(phoneNumber).set({
            otp,
            timestamp,
            attempts: 0
        });

        // Send OTP via Twilio
        try {
            await twilioClient.messages.create({
                body: `Your InstantLoan verification code is: ${otp}. Valid for 5 minutes. Do not share this OTP with anyone.`,
                to: phoneNumber,
                from: process.env.TWILIO_PHONE_NUMBER
            });

            res.json({ 
                message: 'OTP sent successfully',
                success: true
            });
        } catch (twilioError) {
            console.error('Twilio Error:', twilioError);
            
            // In development, still return the OTP for testing
            if (process.env.NODE_ENV === 'development') {
                res.json({ 
                    message: 'OTP generated (SMS failed - development mode)',
                    success: true,
                    otp // Only included in development
                });
            } else {
                // In production, handle SMS failure
                await db.collection('otps').doc(phoneNumber).delete();
                res.status(500).json({ 
                    error: 'Failed to send OTP SMS',
                    success: false
                });
            }
        }
    } catch (error) {
        console.error('Error in send-otp:', error);
        res.status(500).json({ 
            error: 'Failed to process request',
            success: false
        });
    }
}
