import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { db } from '../../../firebase/admin';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

interface SigninRequest {
  email: string;
  password: string;
}

interface SigninResponse {
  success: boolean;
  message?: string;
  user?: any;
  timings?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SigninResponse>
) {
  const timings: any = {};
  const startTime = performance.now();

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { email, password }: SigninRequest = req.body;

    // Validate input first
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Query optimization: Use index on email field
    const queryStart = performance.now();
    const userQuery = db.collection('agents')
      .where('email', '==', email.toLowerCase().trim()) // Normalize email
      .select('password', 'email', 'firstName', 'lastName', 'role', 'phone', 'photoURL', 'agentID') // Select only needed fields
      .limit(1);

    const userSnapshot = await userQuery.get();
    timings.query = performance.now() - queryStart;
    console.log('Query time:', timings.query, 'ms');

    if (userSnapshot.empty) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Password comparison
    const pwStart = performance.now();
    const passwordMatch = await compare(password, userData.password);
    timings.passwordCompare = performance.now() - pwStart;
    console.log('Password compare time:', timings.passwordCompare, 'ms');

    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Create JWT
    const jwtStart = performance.now();
    const token = sign(
      {
        userId: userDoc.id,
        email: userData.email,
        role: userData.role
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Create cookie with the token
    const cookie = serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400,
      path: '/'
    });

    timings.jwt = performance.now() - jwtStart;
    console.log('JWT time:', timings.jwt, 'ms');

    // Set cookie header
    res.setHeader('Set-Cookie', cookie);

    // Remove sensitive data and prepare response
    const { password: _, ...safeUserData } = userData;

    timings.total = performance.now() - startTime;
    console.log('Total time:', timings.total, 'ms');

    return res.status(200).json({
      success: true,
      message: 'Signed in successfully',
      user: {
        id: userDoc.id,
        ...safeUserData
      },
      timings
    });

  } catch (error) {
    console.error('Signin error:', error);
    const errorTime = performance.now() - startTime;
    console.log('Error occurred after:', errorTime, 'ms');

    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      timings
    });
  }
}