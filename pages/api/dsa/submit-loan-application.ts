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

    // Generate IDs and timestamp once
    const timestamp = new Date().toISOString();
    const referralId = `Referral-${shortUUID.generate()}`;
    const loanApplicationId = `Loan-${shortUUID.generate()}`;

    // Create a batch write
    const batch = db.batch();

    // Prepare referral document with minimal data
    const referralRef = db.collection('referrals').doc(referralId);
    batch.set(referralRef, {
      referralId,
      agentId,
      panNumber: applicationData.panNumber,
      loanApplicationId, // Link to loan application
      status: 'pending',
      createdAt: timestamp,
      updatedAt: timestamp,
      // Add essential fields for quick reference
      applicantName: applicationData.name,
      loanType: applicationData.loanType,
      loanAmount: applicationData.loanAmount
    });

    // Prepare loan application document with full data
    const loanAppRef = db.collection('loan-applications').doc(loanApplicationId);
    batch.set(loanAppRef, {
      ...applicationData,
      loanApplicationId,
      referralId,
      agentId,
      status: 'submitted',
      createdAt: timestamp,
      updatedAt: timestamp,
      applicationStatus: [{
        status: 'submitted',
        timestamp,
        comment: 'Application submitted by agent'
      }]
    });

    // Commit both documents atomically
    await batch.commit();

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