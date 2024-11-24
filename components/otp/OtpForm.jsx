import React, { useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";

const PhoneAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");

  const resetRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear(); // Clear existing reCAPTCHA instance
      setupRecaptcha(); // Reinitialize
    }
  };

  useEffect(() => {
    resetRecaptcha();
  },[]);

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

  const sendOTP = async (e) => {
    e?.preventDefault();
    setError("");
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      try {
        const confirmationResult = await signInWithPhoneNumber(auth , phone , appVerifier);
        setConfirmationResult(confirmationResult);
        console.log("OTP sent");
      } catch(e) {
        setError("Failed to send OTP: " + err.message);
        console.error(err);
        resetRecaptcha();
      };
    } catch (err) {
      resetRecaptcha();
      setError("Error initializing reCAPTCHA: " + err.message);
    }
  };

  const verifyOTP = () => {
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

  return (
    <div
      style={{
        marginTop: "10rem",
      }}
    >
      <h1>Phone Authentication</h1>
      <div id="recaptcha-container"/>

      {!confirmationResult ? (
        <div>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOTP}>Send OTP</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PhoneAuth;
