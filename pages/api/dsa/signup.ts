import { hash } from 'bcryptjs';
import { db } from '../../../firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';
import shortUUID from 'short-uuid';


interface SignupRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  panNumber: string;
  profession: string;
  state: string;
  city: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      panNumber,
      profession,
      state,
      city,
      password
    }: SignupRequest = req.body;

    // Check if user already exists
    const userSnapshot = await db
      .collection('agents')
      .where('email', '==', email)
      .get();

    if (!userSnapshot.empty) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Agent ID
    const agentID = `Agent-${shortUUID.generate()}`

    // Create agent document
    const agentData = {
      agentID,
      firstName,
      middleName,
      lastName,
      email,
      phone,
      panNumber,
      profession,
      state,
      city,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      role: 'agent',
      photoURL: '',
    };

    // Add to Firestore
    const docRef = await db.collection('agents').add(agentData);

    // Return success without sending back sensitive data
    return res.status(201).json({
      message: 'Agent registered successfully',
      agentId: docRef.id
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 