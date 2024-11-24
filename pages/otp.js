import ShortNavbar from "../components/common/ShortNavbar";
import OtpContainer from "../components/otp/OtpContainer";

export default function Otp() {
  return (
    <>
      <ShortNavbar />
      <OtpContainer/>
    </>
  );
}

Otp.getLayout = function getLayout(page) {
  return <>{page}</>;
};
