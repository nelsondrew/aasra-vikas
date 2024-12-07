import { adminAuth } from "../../firebase/authAdmin";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: 'Token is required' });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return res.status(200).json({ success: true, decodedToken });
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}
