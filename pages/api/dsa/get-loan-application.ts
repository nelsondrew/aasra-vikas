import { db } from '../../../firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Application ID is required' });
    }

    const applicationDoc = await db.collection('loan-applications')
      .doc(id as string)
      .get();

    if (!applicationDoc.exists) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    return res.status(200).json({
      success: true,
      application: {
        loanApplicationId: applicationDoc.id,
        ...applicationDoc.data()
      }
    });

  } catch (error) {
    console.error('Error fetching application:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch application' });
  }
} 