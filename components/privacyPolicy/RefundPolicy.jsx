import styled from "styled-components";

const StyledRefundPolicySection = styled.section`
  h4 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }
`

const RefundPolicyContent = () => {
    return (
      <StyledRefundPolicySection className="refund-policy-content">
        <div className="overlay pt-120 pb-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="top-wrapper">
                  <h4>Refund and Cancellation Policy</h4>
                  <p>
                    At Aasra Vikas Micro Service Foundation, we strive to make the loan application and approval process as smooth as possible. This Refund and Cancellation Policy explains the conditions under which we handle cancellations and refunds related to loan applications.
                  </p>
  
                  <h4>Cancellation Policy</h4>
                  <ul>
                    <li>
                      Cancellation requests will be considered only if made immediately after submitting the loan application and before the loan approval process is initiated. Once the loan has been approved or disbursed, cancellation requests cannot be entertained.
                    </li>
                    <li>
                      Since our loans are unsecured and aimed at helping individuals, we encourage applicants to carefully review their loan request details before submission.
                    </li>
                  </ul>
  
                  <h4>Refund Policy for Loan Processing Fees</h4>
                  <p>
                    A nominal processing fee of ₹199 is charged at the time of loan application. However, if a loan application is canceled before it is processed or approved, the processing fee may be refunded at the discretion of Aasra Vikas Micro Service Foundation. Refund requests for processing fees are only applicable under exceptional circumstances, and will be reviewed on a case-by-case basis.
                  </p>
  
                  <h4>Loan Amount Disbursement and Refunds</h4>
                  <p>
                    Once the loan amount has been disbursed to the applicant’s bank account, no refunds can be issued. If an applicant decides to cancel the loan after disbursement, they may be required to repay the full loan amount as per the terms of the loan agreement.
                  </p>
  
                  <h4>Incorrect or Mismatched Loan Details</h4>
                  <p>
                    If you notice any errors or discrepancies in your loan details after submission, please contact our Customer Service team within 30 days of the loan disbursement. We will review your case and take appropriate action to rectify the issue.
                  </p>
  
                  <h4>Loan Repayment and Delays</h4>
                  <p>
                    Aasra Vikas Micro Service Foundation offers unsecured loans to individuals in need. Once a loan is disbursed, repayment schedules are strictly followed. If you experience any financial difficulty or need to delay repayment, please get in touch with us to discuss options for restructuring your repayment terms. However, refunds are not applicable for any loan repayments once processed.
                  </p>
  
                  <h4>Refund Processing Timeline</h4>
                  <p>
                    Refunds for processing fees (where applicable) will be processed within 9-15 days after the cancellation request has been reviewed and approved. Refunds will be credited to the original payment method used for the transaction.
                  </p>
  
                  <h4>Contact Us</h4>
                  <p>
                    If you have any questions or concerns regarding our Refund and Cancellation Policy, please feel free to reach out to our support team:
                    <br />
                    <b>Aasra Vikas Micro Service Foundation</b>
                    <br />
                    Email: support@aasravikas.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledRefundPolicySection>
    );
  };
  
  export default RefundPolicyContent;
  