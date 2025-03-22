export interface InitialState {
  mobileNumber: string;
  agreed: boolean;
  showOTP: boolean;
  isVerified: boolean;
  panNumber: string;
  isPanVerified: boolean;
  name: string;
  dob: string;
  isNameVerified: boolean;
  isDobVerified: boolean;
  aadhaarNumber: string;
  showAdditionalDetails: boolean;
  email: string;
  employmentType: string;
  salary: string;
  showWorkDetails: boolean;
  workEmail: string;
  officeAddress: string;
  salarySlips: Array<{
    label: string;
    url: string;
  }>;
  personalAddress: string;
  currentCity: string;
  currentLoans: string;
  stayingStatus: string;
  currentScreen: string;
  showPayment: boolean;
  showVerificationStatus: boolean;
} 