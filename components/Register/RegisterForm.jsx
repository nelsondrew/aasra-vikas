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

  const [formDetails, setFormDetails] = useState({
    applicantName: "",
    mothersName: "",
    fathersName: "",
    dob: "",
    pan: "",
    currentAddress: "",
    currentAddressSince: "",
    permanentAddress: "",
    houseStatus: "",
    employmentType: "",
    salary: "",
    income: "",
    education: "",
    workExperience: "",
    dependents: "",
    ongoingLoans: "",
    loanObligation: "",
    emi: "",
    ref1Name: "",
    ref1Relation: "",
    ref1Contact: "",
    ref2Name: "",
    ref2Relation: "",
    ref2Contact: "",
    numberVerified: false,
    mobileNumber: 0,
    bankStatementUrl: '',
});



  return (
    <>
      {otpFormState === OTP_STATES.REGISTRATION && (
        <section className="sign-in-up register">
          <div className="overlay pt-120 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <LoanApplication formDetails={formDetails} setFormDetails={setFormDetails} setOtpFormState={setOtpFormState} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {otpFormState !== OTP_STATES.REGISTRATION && (
        <OtpContainer pan={formDetails?.pan} otpFormState={otpFormState} setOtpFormState={setOtpFormState}/>
      )}
    </>
  );
};

export default RegisterForm;
