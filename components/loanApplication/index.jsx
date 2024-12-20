import { useState } from "react";
import CustomSelect from "../customSelect";
import useIsMobile from "../../hooks/useIsMobile";
import styled from "styled-components";
import { db, storage } from "../../firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { OTP_STATES } from "../Register/RegisterForm";
import { APPLICATION_FIELDS } from "../../data/constants";

const StyledSection = styled.section`
  .single-input {
    display: flex;
    flex-direction: column;
  }
  .error-border {
    input {
      border: 1px solid red;
    }
  }
  .error {
    color: red;
    font-size: 0.875rem;
  }

  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;



const LoanApplication = ({ setOtpFormState, formDetails, setFormDetails }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const [bankStatement, setBankStatement] = useState(null); // State for storing bank statement file
  const isMobile = useIsMobile();

  const validateForm = () => {
    const newErrors = {};
    if (!formDetails.applicantName.trim()) newErrors.applicantName = "Applicant name is required.";
    if (!formDetails.mothersName.trim()) newErrors.mothersName = "Mother's name is required.";
    if (!formDetails.fathersName.trim()) newErrors.fathersName = "Father's name is required.";
    if (!formDetails.dob) newErrors.dob = "Date of birth is required.";
    if (!formDetails.pan.trim()) newErrors.pan = "PAN number is required.";
    if (!formDetails.currentAddress.trim()) newErrors.currentAddress = "Current address is required.";
    if (!formDetails.currentAddressSince) newErrors.currentAddressSince = "Current address duration is required.";
    if (!formDetails.permanentAddress.trim()) newErrors.permanentAddress = "Permanent address is required.";
    if (!formDetails.houseStatus) newErrors.houseStatus = "House ownership status is required.";
    if (!formDetails.employmentType) newErrors.employmentType = "Employment type is required.";
    if (formDetails.employmentType === "salaried" && !formDetails.salary) newErrors.salary = "Salary is required.";
    if (formDetails.employmentType === "selfEmployed" && !formDetails.income) newErrors.income = "Monthly income is required.";
    if (!formDetails.education.trim()) newErrors.education = "Education qualification is required.";
    if (!formDetails.workExperience.trim()) newErrors.workExperience = "Work experience is required.";
    if (!formDetails.dependents) newErrors.dependents = "Number of dependents is required.";
    if (!formDetails.ongoingLoans) newErrors.ongoingLoans = "Number of ongoing loans is required.";
    if (!formDetails.loanObligation) newErrors.loanObligation = "Total loan obligation is required.";
    if (!formDetails.emi) newErrors.emi = "Total EMI is required.";
    // if (!formDetails.ref1Name.trim()) newErrors.ref1Name = "Reference 1 name is required.";
    // if (!formDetails.ref1Relation.trim()) newErrors.ref1Relation = "Reference 1 relation is required.";
    // if (!formDetails.ref1Contact.trim()) newErrors.ref1Contact = "Reference 1 contact is required.";
    // if (!formDetails.ref2Name.trim()) newErrors.ref2Name = "Reference 2 name is required.";
    // if (!formDetails.ref2Relation.trim()) newErrors.ref2Relation = "Reference 2 relation is required.";
    // if (!formDetails.ref2Contact.trim()) newErrors.ref2Contact = "Reference 2 contact is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBankStatement(file); // Store the selected file
    }
  };

  const uploadBankStatement = async (file) => {
    const storageRef = ref(storage, "bank_statements/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can show progress here
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Set loading to true on submit
      try {
        // Check if PAN already exists
        const panExists = await checkPanExistence(formDetails.pan);
        if (panExists) {
          toast.error("A person with this PAN already exists in the system.", {
            position: "bottom-right",
          });
          return;
        }

        let bankStatementUrl = "";
        if (bankStatement) {
          bankStatementUrl = await uploadBankStatement(bankStatement); // Upload bank statement and get URL
          console.log("upload bank statement with", bankStatementUrl)
          setFormDetails((prevDetails) => ({
            ...prevDetails,
            bankStatementUrl, // Add the URL to formDetails
          }));
        }

        await addLoanApplicant({
            ...formDetails,
            bankStatementUrl
        }); // Proceed with the loan application submission
        toast.success("Loan applicant details submitted successfully!", {
          position: "bottom-right",
        });
        setTimeout(() => {
          setOtpFormState(OTP_STATES.MOBILE_NUMBER_SUBMIT);
        }, 500);
        console.log("Form submitted successfully:", formDetails);
      } catch (error) {
        toast.error("Error submitting form. Please try again later.", {
          position: "bottom-right",
        });
        console.error("Error adding document: ", error);
      } finally {
        setLoading(false); // Set loading to false after request
      }
    } else {
      console.log("Validation errors:", errors);
    }
  };

  // Check if a PAN exists in the Firestore database
  const checkPanExistence = async (pan) => {
    const q = query(collection(db, "loan-applicants"), where("pan", "==", pan));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Return true if PAN exists
  };

  // Function to create an entry in Firestore
  const addLoanApplicant = async (applicantData) => {
    try {
      // Add a new document to the 'loan-applicants' collection
      const docRef = await addDoc(collection(db, "loan-applicants"), applicantData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <StyledSection className="loan-application-form">
      <div className="overlay pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="form-content">
                <div className="section-header">
                  <h5 className="sub-title">Loan Application Form</h5>
                  <h2 className="title">Provide Your Details</h2>
                  <p>Fill in the required information for your loan application.</p>
                </div>
                <form>
                  <div className="row">
                    {/* Dynamic Fields */}
                    {APPLICATION_FIELDS.map((field, index) => (
                      <div className={field?.class || "col-6"} key={index}>
                        <div
                          style={{
                            ...(isMobile && field?.mobileStyle && { ...field.mobileStyle }),
                          }}
                          className={`single-input ${errors[field.name] ? "error-border" : ""}`}
                        >
                          {field.type === "select" ? (
                            <CustomSelect
                              label={field.label}
                              name={field.name}
                              options={field.options}
                              value={formDetails[field.name]}
                              onChange={handleInputChange}
                            />
                          ) : field.type === "file" ? (
                            <>
                              <label htmlFor={field.name}>{field.label}</label>
                              <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                onChange={handleFileChange}
                                required
                              />
                            </>
                          ) : (
                            <>
                              <label htmlFor={field.name}>{field.label}</label>
                              <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formDetails[field.name]}
                                onChange={handleInputChange}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                required
                              />
                            </>
                          )}
                          {errors[field.name] && <small className="error">{errors[field.name]}</small>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="btn-area">
                    <button
                      onClick={handleSubmit}
                      style={{
                        marginTop: "2rem",
                      }}
                      type="submit"
                      className="cmn-btn"
                    >
                      {loading ? <div className="loader" /> : "Submit Application"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledSection>
  );
};

export default LoanApplication;
