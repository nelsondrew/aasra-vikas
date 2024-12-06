// import twilio from 'twilio';


// const client = twilio(accountSid, authToken);

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { phoneNumber } = req.body;

//   if (!phoneNumber) {
//     return res.status(400).json({ error: 'Phone number is required' });
//   }

//   // Generate a 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000);

//   try {
//     // Send OTP via Twilio
//     const message = await client.messages.create({
//       body: `Your OTP is: ${otp}`,
//       from: twilioPhoneNumber,
//       to: phoneNumber,
//     });

//     res.status(200).json({
//       message: 'OTP sent successfully',
//       otp, // For debugging purposes, remove this in production!
//       sid: message.sid,
//     });
//   } catch (error) {
//     console.error('Twilio error:', error);
//     res.status(500).json({ error: 'Failed to send OTP' });
//   }
// }
