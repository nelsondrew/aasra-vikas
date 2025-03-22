import React from 'react';
import VerifyDetailsV2 from '../components/loanV2/VerifyDetails';

export default function VerifyDetailsV2Page() {
  const initialState = {
    "mobileNumber": "",
    "agreed": false,
    "showOTP": false,
    "otp": [
      '', '', '', '', '', ''
    ],
    "isVerified": false,
    "panNumber": "",
    "isPanVerified": false,
    "name": "",
    "dob": "",
    "isNameVerified": false,
    "isDobVerified": false,
    "aadhaarNumber": "",
    "showAdditionalDetails": false,
    "email": "",
    "employmentType": "salaried",
    "salary": "",
    "showWorkDetails": false,
    "workEmail": "",
    "officeAddress": "",
    "salarySlips": [
      "",
      "",
      ""
    ],
    "personalAddress": "",
    "currentCity": "",
    "currentLoans": "",
    "stayingStatus": "",
    "currentScreen": "verify",
    "showPayment": false,
    "showVerificationStatus": false
  }
  return <VerifyDetailsV2 initialState={initialState} />;
};

VerifyDetailsV2Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};



