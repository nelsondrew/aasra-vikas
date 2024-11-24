import {  useState } from "react";
import CustomSelect from "../customSelect";
import useIsMobile from "../../hooks/useIsMobile";
import styled from "styled-components";
import { db } from "../../firebase";
import { addDoc, collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { OTP_STATES } from "../Register/RegisterForm";

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

const LoanApplication = ({setOtpFormState}) => {
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
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Add loading state

    const isMobile = useIsMobile();

    const validateForm = () => {
        const newErrors = {};
        if (!formDetails.applicantName.trim())
            newErrors.applicantName = "Applicant name is required.";
        if (!formDetails.mothersName.trim())
            newErrors.mothersName = "Mother's name is required.";
        if (!formDetails.fathersName.trim())
            newErrors.fathersName = "Father's name is required.";
        if (!formDetails.dob) newErrors.dob = "Date of birth is required.";
        if (!formDetails.pan.trim()) newErrors.pan = "PAN number is required.";
        if (!formDetails.currentAddress.trim())
            newErrors.currentAddress = "Current address is required.";
        if (!formDetails.currentAddressSince)
            newErrors.currentAddressSince = "Current address duration is required.";
        if (!formDetails.permanentAddress.trim())
            newErrors.permanentAddress = "Permanent address is required.";
        if (!formDetails.houseStatus)
            newErrors.houseStatus = "House ownership status is required.";
        if (!formDetails.employmentType)
            newErrors.employmentType = "Employment type is required.";
        if (formDetails.employmentType === "salaried" && !formDetails.salary)
            newErrors.salary = "Salary is required.";
        if (formDetails.employmentType === "selfEmployed" && !formDetails.income)
            newErrors.income = "Monthly income is required.";
        if (!formDetails.education.trim())
            newErrors.education = "Education qualification is required.";
        if (!formDetails.workExperience.trim())
            newErrors.workExperience = "Work experience is required.";
        if (!formDetails.dependents)
            newErrors.dependents = "Number of dependents is required.";
        if (!formDetails.ongoingLoans)
            newErrors.ongoingLoans = "Number of ongoing loans is required.";
        if (!formDetails.loanObligation)
            newErrors.loanObligation = "Total loan obligation is required.";
        if (!formDetails.emi) newErrors.emi = "Total EMI is required.";
        if (!formDetails.ref1Name.trim())
            newErrors.ref1Name = "Reference 1 name is required.";
        if (!formDetails.ref1Relation.trim())
            newErrors.ref1Relation = "Reference 1 relation is required.";
        if (!formDetails.ref1Contact.trim())
            newErrors.ref1Contact = "Reference 1 contact is required.";
        if (!formDetails.ref2Name.trim())
            newErrors.ref2Name = "Reference 2 name is required.";
        if (!formDetails.ref2Relation.trim())
            newErrors.ref2Relation = "Reference 2 relation is required.";
        if (!formDetails.ref2Contact.trim())
            newErrors.ref2Contact = "Reference 2 contact is required.";

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
                await addLoanApplicant(formDetails);
                toast.success("Loan applicant details submitted successfully!", {
                    position: "bottom-right",
                });
                setTimeout(() => {
                    setOtpFormState(OTP_STATES.MOBILE_NUMBER_SUBMIT)

                },500)
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
            const docRef = await addDoc(
                collection(db, "loan-applicants"),
                applicantData
            );
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
                                    <p>
                                        Fill in the required information for your loan application.
                                    </p>
                                </div>
                                <form>
                                    <div className="row">
                                        {/* Dynamic Fields */}
                                        {[
                                            {
                                                label: "Applicant Name",
                                                name: "applicantName",
                                                type: "text",
                                                class: "col-12",
                                            },
                                            {
                                                label: "Mother's Name",
                                                name: "mothersName",
                                                type: "text",
                                                class: "col-6",
                                            },
                                            {
                                                label: "Father's Name",
                                                name: "fathersName",
                                                type: "text",
                                                class: "col-6",
                                            },
                                            {
                                                label: "Date of Birth",
                                                name: "dob",
                                                type: "date",
                                                class: "col-6",
                                            },
                                            {
                                                label: "PAN Number",
                                                name: "pan",
                                                type: "text",
                                                class: "col-6",
                                            },
                                            {
                                                label: "Current Address",
                                                name: "currentAddress",
                                                type: "text",
                                                class: "col-12",
                                            },
                                            {
                                                label: "Staying at Current Address Since",
                                                name: "currentAddressSince",
                                                type: "date",
                                                class: "col-6",
                                            },
                                            {
                                                label: "Permanent Address",
                                                name: "permanentAddress",
                                                type: "text",
                                                class: "col-12",
                                            },
                                            {
                                                label: "House Owned or Rented?",
                                                name: "houseStatus",
                                                type: "select",
                                                options: ["Owned", "Rented"],
                                                class: "col-6",
                                            },
                                            {
                                                label: "Employment Type",
                                                name: "employmentType",
                                                type: "select",
                                                options: ["Salaried", "Self-Employed"],
                                                class: "col-6",
                                                mobileStyle: {
                                                    marginTop: "18px",
                                                },
                                            },
                                            {
                                                label: "Salary",
                                                name: "salary",
                                                type: "number",
                                                class: "col-6",
                                            },
                                            {
                                                label: "Monthly Income",
                                                name: "income",
                                                type: "number",
                                                class: "col-6",
                                            },
                                            {
                                                label: "Education Qualification",
                                                name: "education",
                                                type: "text",
                                                class: "col-6",
                                            },
                                            {
                                                label: "Work Experience",
                                                name: "workExperience",
                                                type: "text",
                                                class: "col-6",
                                            },
                                            {
                                                label: "Number of Dependents",
                                                name: "dependents",
                                                type: "number",
                                                class: "col-6",
                                            },
                                            {
                                                label: "Current Number of Ongoing Loans",
                                                name: "ongoingLoans",
                                                type: "number",
                                                class: "col-6",
                                            },
                                            {
                                                label: "Total Loan Obligation",
                                                name: "loanObligation",
                                                type: "number",
                                                class: "col-6",
                                            },
                                            {
                                                label: "Total EMI Paying Currently",
                                                name: "emi",
                                                type: "number",
                                            },
                                            {
                                                label: "Reference 1 Name",
                                                name: "ref1Name",
                                                type: "text",
                                                class: "col-12",
                                            },
                                            {
                                                label: "Reference 1 Relation",
                                                name: "ref1Relation",
                                                type: "text",
                                                class: "col-12",
                                            },
                                            {
                                                label: "Reference 1 Contact",
                                                name: "ref1Contact",
                                                type: "text",
                                                class: "col-12",
                                            },
                                            {
                                                label: "Reference 2 Name",
                                                name: "ref2Name",
                                                type: "text",
                                                class: "col-12",
                                            },
                                            {
                                                label: "Reference 2 Relation",
                                                name: "ref2Relation",
                                                type: "text",
                                                class: "col-12",
                                            },
                                            {
                                                label: "Reference 2 Contact",
                                                name: "ref2Contact",
                                                type: "text",
                                                class: "col-12",
                                            },
                                        ].map((field, index) => (
                                            <div className={field?.class || "col-6"} key={index}>
                                                <div
                                                    style={{
                                                        ...(isMobile &&
                                                            field?.mobileStyle && {
                                                            ...field.mobileStyle,
                                                        }),
                                                    }}
                                                    className={`single-input ${errors[field.name] ? "error-border" : ""
                                                        }`}
                                                >
                                                    {field.type === "select" ? (
                                                        <CustomSelect
                                                            label={field.label}
                                                            name={field.name}
                                                            options={field.options}
                                                            value={formDetails[field.name]}
                                                            onChange={handleInputChange}
                                                        />
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
                                                    {errors[field.name] && (
                                                        <small className="error">
                                                            {errors[field.name]}
                                                        </small>
                                                    )}
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
                                            {loading ? (
                                                <div className="loader" /> // Your custom loader here
                                            ) : (
                                                "Submit Application"
                                            )}
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
