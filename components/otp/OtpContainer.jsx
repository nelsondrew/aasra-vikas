import OtpNew from "./OtpNew";
import { useEffect, useState } from "react";
import VarifyNumberForm from "../varifyNumber/VarifyNumberForm";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";

export const OTP_STATES = {
  MOBILE_NUMBER_SUBMIT: 1,
  OTP_CODE_SUBMIT: 2,
};

export default function OtpContainer() {
  const [otpFormState, setOtpFormState] = useState(
    OTP_STATES.MOBILE_NUMBER_SUBMIT
  );
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

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

  const verifyOTP = async () => {
    if (!confirmationResult) {
      setError("No OTP confirmation available. Retry sending OTP.");
      return;
    }

    confirmationResult
      .confirm(otp)
      .then((result) => {
        console.log("User signed in:", result.user);
      })
      .catch((err) => {
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
    setOtp(otp);
    try {
      await verifyOTP();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div id="recaptcha-container"></div>
      {otpFormState === OTP_STATES.MOBILE_NUMBER_SUBMIT && (
        <>
          <VarifyNumberForm
            loading={loading}
            onPhoneNumberSubmit={handlePhoneSubmit}
          />
        </>
      )}
      {otpFormState === OTP_STATES.OTP_CODE_SUBMIT && confirmationResult && (
        <>
          <OtpNew onOtpSubmit={handleOtpSubmit} />
        </>
      )}
    </>
  );
}
