import SingleBox from "../common/SingleBox";
import { core_values_data } from "./aboutData";

const CoreValues = () => {
  return (
    <section className="our-core-values">
      <div className="overlay pt-120 pb-120">
        <div className="container wow fadeInUp">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="section-header text-center">
                <h5 className="sub-title">Our Core Values</h5>
                <h2 className="title">Guiding Principles That Define Us</h2>
                <p>
                  At Aasra Vikas Micro Service Foundation, our core values
                  shape everything we do. They inspire us to serve with
                  dedication, drive impactful change, and create a brighter
                  future for all. These principles are the foundation of our
                  mission to empower communities and transform lives.
                </p>
              </div>
            </div>
          </div>
          <div className="row cus-mar">
            {core_values_data.map((singleData) => (
              <div key={singleData.id} className="col-xl-4 col-md-4">
                <SingleBox
                  icon={singleData.icon}
                  title={singleData.title}
                  desc={singleData.desc}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
