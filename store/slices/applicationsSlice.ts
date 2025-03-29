import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoanApplication = {
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
  tenure: number;
  salarySlips: {
    url: string;
    label: string;
  }[];
  cibil: string;
};

type NormalizedApplications = {
  [key: string]: LoanApplication;
};

type ApplicationsState = {
  applicationsById: NormalizedApplications;
  allIds: string[];
};

const initialState: ApplicationsState = {
  applicationsById: {},
  allIds: []
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    cacheApplications: (state, action: PayloadAction<LoanApplication[]>) => {
      // Reset the state
      state.applicationsById = {};
      state.allIds = [];
      
      // Normalize the applications array
      action.payload.forEach(application => {
        state.applicationsById[application.loanApplicationId] = application;
        state.allIds.push(application.loanApplicationId);
      });
    },
    updateCachedApplication: (state, action: PayloadAction<LoanApplication>) => {
      const { loanApplicationId } = action.payload;
      
      // Update or add the application
      state.applicationsById[loanApplicationId] = action.payload;
      
      // Add ID to allIds if it's not already there
      if (!state.allIds.includes(loanApplicationId)) {
        state.allIds.push(loanApplicationId);
      }
    }
  }
});

// Selectors
export const selectAllApplications = (state: { applications: ApplicationsState }) => 
  state.applications.allIds.map(id => state.applications.applicationsById[id]);

export const selectApplicationsById = (state: { applications: ApplicationsState }, id: string) => 
  state.applications.applicationsById[id];

export const { cacheApplications, updateCachedApplication } = applicationsSlice.actions;
export default applicationsSlice.reducer; 