import { db } from '../../../firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';
import shortUUID from 'short-uuid';

interface LoanApplication {
  // Personal Information
  name: string;
  email: string;
  mobileNumber: string;
  dob: string;
  
  // Loan Details
  loanType: string;
  loanAmount: string;
  loanPurpose: string;
  
  // Identity Details
  aadhaarNumber: string;
  panNumber: string;
  
  // Employment & Financial Details
  employmentType: string;
  salary: string;
  currentLoans?: string;
  workEmail?: string;
  salarySlips: Array<{
    label: string;
    url: string;
  }>;
  
  // Address Details
  officeAddress: string;
  personalAddress: string;
  currentCity: string;
  stayingStatus: string;
}

interface SubmitResponse {
  success: boolean;
  error?: string;
  referralId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubmitResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const applicationData: LoanApplication = req.body;
    const { agentId } = req.body;

    if (!applicationData || !agentId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Application data and agent ID are required' 
      });
    }

    // Generate referral ID
    const referralId = `Referral-${shortUUID.generate()}`;
    const timestamp = new Date().toISOString();

    // Create referral document with 'pending' status
    const referralData = {
      referralId,
      agentId,
      panNumber: applicationData.panNumber,
      status: 'pending',  // Referral starts as pending
      createdAt: timestamp,
      updatedAt: timestamp
    };

    // Add to referrals collection
    await db.collection('referrals').doc(referralId).set(referralData);

    // Add detailed application data with 'submitted' status
    const enrichedApplicationData = {
      ...applicationData,
      referralId,
      agentId,
      status: 'submitted',  // Application starts as submitted
      createdAt: timestamp,
      updatedAt: timestamp,
      applicationStatus: [
        {
          status: 'submitted',  // Application status history shows submitted
          timestamp,
          comment: 'Application submitted by agent'
        }
      ]
    };

    await db.collection('loan-applications').add(enrichedApplicationData);

    return res.status(201).json({
      success: true,
      referralId
    });

  } catch (error) {
    console.error('Submit loan application error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to submit loan application' 
    });
  }
} 