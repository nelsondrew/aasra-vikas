import { InitialState } from '../types';

interface SendOTPResponse {
  success: boolean;
  userDetails?: InitialState;
  message?: string;
}

export const sendOTP = async (mobileNumber: string): Promise<SendOTPResponse> => {
  try {
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber: `+91${mobileNumber}` }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

export const verifyOTP = async (phoneNumber: string, otp: string): Promise<SendOTPResponse> => {
  try {
    const response = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        phoneNumber: `+91${phoneNumber}`,
        otp 
      }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const updateUserDetails = async (userDetails: InitialState): Promise<SendOTPResponse> => {
  try {
    const response = await fetch('/api/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userDetails }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};

export const updateUserWithFiles = async (userDetails: InitialState, files: File[]): Promise<SendOTPResponse> => {
  try {
    const formData = new FormData();
    
    // Add user details as JSON string
    formData.append('userDetails', JSON.stringify(userDetails));
    
    // Add salary slip files
    files.forEach((file) => {
      formData.append('salarySlips', file);
    });

    const response = await fetch('/api/update-user-with-upload', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating user with files:', error);
    throw error;
  }
}; 