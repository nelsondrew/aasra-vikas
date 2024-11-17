import LoanApplication from "../loanApplication";

const RegisterForm = () => {
  return (
    <section className="sign-in-up register">
      <div className="overlay pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <LoanApplication/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
