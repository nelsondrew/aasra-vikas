import Image from "next/image";
import about_img_1 from "/public/images/about-img-1.png";
import about_img_2 from "/public/images/about-img-2.png";
import about_img_3 from "/public/images/about-img-3.png";

const Hero = () => {
  return (
    <section className="about-section">
      <div className="overlay pt-120 pb-120">
        <div className="container wow fadeInUp">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="text-area">
                <h5 className="sub-title">About Us</h5>
                <h2 className="title">Empowering Lives, One Opportunity at a Time</h2>
                <p>
                  Welcome to Aasra Vikas Micro Service Foundation, a charitable organization dedicated to empowering underprivileged individuals and fostering sustainable development through financial support and guidance. Established with a mission to uplift communities and eradicate poverty, Aasra Vikas stands as a pillar of hope for those who lack access to traditional financial services.
                </p>
                <p>
                  At Aasra Vikas, we believe that every individual has the potential to thrive if given the right opportunities. Unfortunately, financial barriers often prevent many from realizing their dreams. That’s where we come in. Our goal is to provide interest-free loans to those in need, enabling them to start small businesses, achieve financial independence, and build a better future.
                </p>
              </div>
              <div className="row cus-mar">
                <div className="col-xl-4 col-md-4">
                  <div className="count-content text-center">
                    <div className="count-number">
                      <h4 className="counter">100</h4>
                      <h4 className="static">%</h4>
                    </div>
                    <p>Commitment to Impact</p>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4">
                  <div className="count-content text-center">
                    <div className="count-number">
                      <h4 className="counter">50</h4>
                      <h4 className="static">+</h4>
                    </div>
                    <p>Communities Empowered</p>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4">
                  <div className="count-content text-center">
                    <div className="count-number">
                      <h4 className="counter">10</h4>
                      <h4 className="static">K</h4>
                    </div>
                    <p>Lives Transformed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="text-area">
                <h3 className="section-title">Who We Are</h3>
                <p>
                  Aasra Vikas Micro Service Foundation is more than just an NGO—it’s a movement driven by compassion, integrity, and a vision for an equitable society. Our team of dedicated individuals works tirelessly to address the financial and social challenges faced by marginalized groups. We are committed to creating opportunities for those who need them most, breaking down barriers that hinder progress, and ensuring that our beneficiaries can lead dignified and self-reliant lives.
                </p>
              </div>
              <div className="text-area mt-4">
                <h3 className="section-title">What We Do</h3>
                <ul>
                  <li>
                    <strong>Providing Interest-Free Loans:</strong> We provide interest-free, unsecured loans to individuals and families in financial distress. These loans are tailored to help recipients start small businesses or ventures, such as tailoring shops, food stalls, and other entrepreneurial activities, enabling them to earn a steady income.
                  </li>
                  <li>
                    <strong>Empowering Livelihoods:</strong> Our mission extends beyond financial aid. We offer guidance and mentorship to help individuals manage their businesses effectively. Through training programs, workshops, and community outreach, we empower beneficiaries with the skills they need to sustain and grow their livelihoods.
                  </li>
                  <li>
                    <strong>Affordable Support:</strong> To make our services sustainable, we charge a nominal registration and processing fee of ₹199. This ensures commitment from applicants while covering basic administrative costs.
                  </li>
                  <li>
                    <strong>Comprehensive Community Development:</strong> Our initiatives aren’t limited to financial support. We work closely with communities to understand their unique challenges and provide solutions. From financial literacy programs to supporting education and healthcare, Aasra Vikas is dedicated to holistic development.
                  </li>
                </ul>
              </div>
              <div className="text-area mt-4">
                <h3 className="section-title">Why Choose Aasra Vikas?</h3>
                <p>
                  Aasra Vikas Micro Service Foundation is unique in its approach to empowering individuals. Our interest-free loan model is a testament to our belief in creating opportunities without adding financial burdens. We are driven by the principles of compassion and inclusivity, ensuring that our programs benefit those who truly need them.
                </p>
                <p>
                  We take pride in building genuine relationships with the communities we serve. At Aasra Vikas, every individual is treated with dignity and respect, and we work hand-in-hand to help them overcome challenges and build brighter futures.
                </p>
                <p>
                  Together, we can create lasting change. Whether you’re seeking financial assistance, want to volunteer, or are eager to support our cause, Aasra Vikas welcomes you to join us in our mission to empower lives and build stronger communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
