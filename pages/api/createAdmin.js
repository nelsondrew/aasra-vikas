import { adminAuth } from "../../firebase/authAdmin";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Directly use req.body without parsing
  const { email, password, displayName, adminSecret } = req.body;
  const normalizedFirebaseKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

  if (adminSecret !== normalizedFirebaseKey) {
    return res.status(403).json({ success: false, message: 'Unauthorized admin creation' });
  }

  if (!email || !password || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Email and a password of at least 6 characters are required.',
    });
  }

  try {
    await adminAuth.getUserByEmail(email);
    return res.status(400).json({ success: false, message: 'User with this email already exists' });
  } catch {
    // User doesn't exist, proceed to create
  }

  const userRecord = await adminAuth.createUser({
    email,
    password,
    displayName: displayName || email.split('@')[0],
  });

  await adminAuth.setCustomUserClaims(userRecord.uid, { admin: true, createdAt: Date.now() });

  return res.status(201).json({ success: true, message: 'Admin user created', userId: userRecord.uid });
}
