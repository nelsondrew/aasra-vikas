import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { db } from '../../../firebase/admin';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

interface SigninRequest {
  email: string;
  password: string;
}

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phone : string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password }: SigninRequest = req.body;

    // Find user by email
    const usersSnapshot = await db
      .collection('agents')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (usersSnapshot.empty) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userDoc = usersSnapshot.docs[0];
    const userData = userDoc.data();

    // Compare passwords
    const passwordMatch = await compare(password, userData.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log(userData, "user data from api")

    // Create JWT payload
    const payload: JWTPayload = {
      userId: userDoc.id,
      email: userData.email,
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
    };

    // Sign JWT using jsonwebtoken
    const token = sign(
      payload,
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Set cookie
    const cookie = serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours
      path: '/'
    });

    // Set cookie header
    res.setHeader('Set-Cookie', cookie);

    // Return success with user data (excluding sensitive info)
    return res.status(200).json({
      message: 'Signed in successfully',
      user: {
        id: userDoc.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        phone: userData.phone
      }
    });

  } catch (error) {
    console.error('Signin error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}