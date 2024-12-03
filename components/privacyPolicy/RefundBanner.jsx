import Breadcrumb from "../breadcrumb/Breadcrumb";
import SmallBanner from "../common/SmallBanner";

const Banner = () => {
  return (
    <SmallBanner titile="Refund Policy" cls="privacy-content">
      <Breadcrumb
        breadcrumbs={[
          ["Home", "/"],
          // ["Pages", "/"],
          ["Refund Policy", "/"],
        ]}
      />
    </SmallBanner>
  );
};

export default Banner;
