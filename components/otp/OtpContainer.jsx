import OtpNew from "./OtpNew";
import { useEffect, useState } from "react";
import VerifyNumberForm from "../varifyNumber/VarifyNumberForm";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import PhoneNumberVerified from "./PhoneNumberVerified";
import { OTP_STATES } from "../Register/RegisterForm";


export default function OtpContainer({ otpFormState , setOtpFormState }) {
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);

  const resetRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear(); // Clear existing reCAPTCHA instance
      setupRecaptcha(); // Reinitialize
    }
  };

  useEffect(() => {
    resetRecaptcha();
  }, []);

  const setupRecaptcha = () => {
    // Clear any existing instance
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier?.clear();
    }
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => console.log("reCAPTCHA solved"),
        }
      );
    }
  };

  const sendOTP = async (e, phone) => {
    setLoading(true);
    e?.preventDefault();
    setError("");
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phone,
          appVerifier
        );
        setConfirmationResult(confirmationResult);
        setLoading(false);
        console.log("OTP sent");
      } catch (e) {
        setError("Failed to send OTP: " + e);
        setLoading(false);
        console.log(e);
        resetRecaptcha();
      }
    } catch (err) {
      resetRecaptcha();
      setError("Error initializing reCAPTCHA: " + err.message);
    }
  };

  const verifyOTP = async (otpFromProps) => {
    setOtpVerificationLoading(true);
    if (!confirmationResult) {
      setError("No OTP confirmation available. Retry sending OTP.");
      return;
    }

    confirmationResult
      .confirm(otpFromProps)
      .then((result) => {
        setOtpVerificationLoading(false);
        console.log("User signed in:", result.user);
      })
      .catch((err) => {
        setOtpVerificationLoading(false);
        setError("Invalid OTP: " + err.message);
        console.error(err);
      });
  };

  const handlePhoneSubmit = async (phoneNumber) => {
    try {
      await sendOTP(null, phoneNumber);
      setOtpFormState(OTP_STATES.OTP_CODE_SUBMIT);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOtpSubmit = async (otp) => {
    try {
      await verifyOTP(otp);
      setOtpFormState(OTP_STATES.PHONE_NUMBER_VERIFIED);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div id="recaptcha-container"></div>
      {otpFormState === OTP_STATES.MOBILE_NUMBER_SUBMIT && (
        <>
          <VerifyNumberForm
            loading={loading}
            onPhoneNumberSubmit={handlePhoneSubmit}
          />
        </>
      )}
      {otpFormState === OTP_STATES.OTP_CODE_SUBMIT && confirmationResult && (
        <>
          <OtpNew
            loading={otpVerificationLoading}
            onOtpSubmit={handleOtpSubmit}
          />
        </>
      )}
      {otpFormState === OTP_STATES.PHONE_NUMBER_VERIFIED && (
        <PhoneNumberVerified />
      )}
    </>
  );
}
