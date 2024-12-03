import Image from "next/image";
import { useState } from "react";
import check from "/public/images/icon/check.png";

const Loan = () => {
  const [sliderValue, setSliderValue] = useState(12000);
  const [tenure, setTenure] = useState(12); // Default tenure: 12 months
  const MAX = 200000;

  // Calculate EMI with 0% interest
  const calculateEMI = (principal, tenure) => {
    return tenure > 0 ? principal / tenure : 0;
  };

  const emi = calculateEMI(sliderValue, tenure).toFixed(2);

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(sliderValue * 100) / MAX}% 100%`,
    };
  };

  return (
    <section className="business-loan-section personal-loan">
      <div className="overlay">
        <div className="container wow fadeInUp">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-content">
                <div className="section-text">
                  <h2 className="title">Put Your Plans into Action</h2>
                  <p>
                    Choose the Personal loan amount that you need (₹1,000 to
                    ₹2,00,000) and the payment period (6–36 months) that suits
                    you best.
                  </p>
                </div>
                <form action="#">
                  <div className="form-group">
                    <div className="range-amount">
                      <h4 className="d-flex flex-column align-items-center justify-content-center">
                        <label>
                          Personal Loan Amount : <span> ₹{sliderValue}</span>
                        </label>
                        <input
                          type="range"
                          min={1000}
                          max={MAX}
                          onChange={(e) =>
                            setSliderValue(Number(e.target.value))
                          }
                          style={getBackgroundSize()}
                          value={sliderValue}
                        />
                      </h4>
                    </div>
                    <div id="personal-slide"></div>
                  </div>
                  <ul
                    className="nav nav-tabs justify-content-between"
                    role="tablist"
                  >
                    {[12, 18, 24, 36].map((month) => (
                      <li className="nav-item" role="presentation" key={month}>
                        <button
                          className={`nav-btn ${
                            tenure === month ? "active" : ""
                          }`}
                          onClick={() => setTenure(month)}
                          type="button"
                          role="tab"
                        >
                          {month} Months
                          <span className="mdr">0% Interest</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="bottom-area pt-120 d-xl-flex align-items-center justify-content-between">
                    <div>
                      <h5>
                        Monthly Payment: <span>₹{emi}</span>
                      </h5>
                    </div>
                    <a href="#personal-loan-form" className="cmn-btn">
                      Apply for a Personal Loan
                    </a>
                  </div>
                </form>
              </div>
              <ul className="list d-lg-flex justify-content-between">
                <li className="list-item d-flex align-items-center">
                  <span className="check d-flex align-items-center justify-content-center">
                    <Image src={check} alt="icon" />
                  </span>
                  <span>No Credit history required</span>
                </li>
                <li className="list-item d-flex align-items-center ">
                  <span className="check d-flex align-items-center justify-content-center">
                    <Image src={check} alt="icon" />
                  </span>
                  <span>Checking for rate won&#39;t impact credit score</span>
                </li>
                <li className="list-item d-flex align-items-center ">
                  <span className="check d-flex align-items-center justify-content-center">
                    <Image src={check} alt="icon" />
                  </span>
                  <span>No prepayment fees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loan;
