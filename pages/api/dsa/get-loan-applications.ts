import { db } from '../../../firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

interface LoanApplication {
  loanApplicationId: string;
  referralId: string;
  name: string;
  loanType: string;
  loanAmount: string;
  loanPurpose: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  mobileNumber: string;
  dob: string;
  aadhaarNumber: string;
  panNumber: string;
  employmentType: string;
  salary: string;
  currentLoans?: string;
  workEmail?: string;
  currentCity: string;
  officeAddress: string;
  personalAddress: string;
  stayingStatus: string;
}

interface GetLoanApplicationsResponse {
  success: boolean;
  applications?: LoanApplication[];
  error?: string;
  timings?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetLoanApplicationsResponse>
) {
  const timings: any = {};
  const startTime = performance.now();

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    // Get agentId from query params
    const { agentId } = req.query;

    if (!agentId || typeof agentId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Agent ID is required'
      });
    }

    // Query optimization: Use index on agentId field
    const queryStart = performance.now();
    const applicationsQuery = db.collection('loan-applications')
      .where('agentId', '==', agentId)
      .orderBy('createdAt', 'desc') // Most recent first
      .select(
        'loanApplicationId',
        'referralId',
        'name',
        'loanType',
        'loanAmount',
        'loanPurpose',
        'status',
        'createdAt',
        'updatedAt',
        'email',
        'mobileNumber',
        'dob',
        'aadhaarNumber',
        'panNumber',
        'employmentType',
        'salary',
        'currentLoans',
        'workEmail',
        'currentCity',
        'officeAddress',
        'personalAddress',
        'stayingStatus'
      );

    const snapshot = await applicationsQuery.get();
    timings.query = performance.now() - queryStart;
    console.log('Query time:', timings.query, 'ms');

    // Transform data
    const transformStart = performance.now();
    const applications = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        loanApplicationId: data.loanApplicationId,
        referralId: data.referralId,
        name: data.name,
        loanType: data.loanType,
        loanAmount: data.loanAmount,
        loanPurpose: data.loanPurpose,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        email: data.email,
        mobileNumber: data.mobileNumber,
        dob: data.dob,
        aadhaarNumber: data.aadhaarNumber,
        panNumber: data.panNumber,
        employmentType: data.employmentType,
        salary: data.salary,
        currentLoans: data.currentLoans,
        workEmail: data.workEmail,
        currentCity: data.currentCity,
        officeAddress: data.officeAddress,
        personalAddress: data.personalAddress,
        stayingStatus: data.stayingStatus
      };
    });
    timings.transform = performance.now() - transformStart;
    console.log('Transform time:', timings.transform, 'ms');

    timings.total = performance.now() - startTime;
    console.log('Total time:', timings.total, 'ms');

    return res.status(200).json({
      success: true,
      applications,
      timings
    });

  } catch (error) {
    console.error('Error fetching loan applications:', error);
    const errorTime = performance.now() - startTime;
    console.log('Error occurred after:', errorTime, 'ms');

    return res.status(500).json({
      success: false,
      error: 'Failed to fetch loan applications',
      timings
    });
  }
} 