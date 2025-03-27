import { db } from '../../../firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

interface UpdateResponse {
  success: boolean;
  error?: string;
  user?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateResponse>
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { documentId, updates } = req.body;
    console.log(documentId)

    if (!documentId) {
      return res.status(400).json({ success: false, error: 'Document ID is required' });
    }

    console.log(documentId , "document id ")

    // First verify the document exists
    const agentQuery = await db.collection('agents')
      .doc(documentId)
      .get();
    
      console.log(agentQuery , "agent query ")

    if (!agentQuery.exists) {
      return res.status(404).json({ success: false, error: 'Agent not found' });
    }

    // Update the document
    await db.collection('agents')
      .doc(documentId)
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      });

    // Get the updated document
    const updatedAgent = await db.collection('agents')
      .doc(documentId)
      .get();

    const userData = updatedAgent.data();

    return res.status(200).json({
      success: true,
      user: {
        id: updatedAgent.id,
        documentId: updatedAgent.id,
        ...userData
      }
    });

  } catch (error) {
    console.error('Update agent error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to update agent'
    });
  }
} 