import { useState } from "react";
import LoanApplication from "../loanApplication";
import OtpContainer from "../otp/OtpContainer";

export const OTP_STATES = {
  REGISTRATION: 0,
  MOBILE_NUMBER_SUBMIT: 1,
  OTP_CODE_SUBMIT: 2,
  PHONE_NUMBER_VERIFIED: 3,
};

const RegisterForm = () => {
  const [otpFormState, setOtpFormState] = useState(
    OTP_STATES.REGISTRATION
  );

  return (
    <>
      {otpFormState === OTP_STATES.REGISTRATION && (
        <section className="sign-in-up register">
          <div className="overlay pt-120 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <LoanApplication setOtpFormState={setOtpFormState} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {otpFormState !== OTP_STATES.REGISTRATION && (
        <OtpContainer otpFormState={otpFormState} setOtpFormState={setOtpFormState}/>
      )}
    </>
  );
};

export default RegisterForm;
