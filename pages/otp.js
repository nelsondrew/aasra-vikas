import ShortNavbar from "../components/common/ShortNavbar";
import OtpForm from "../components/otp/OtpForm";
import OtpNew from "../components/otp/OtpNew";

export default function Otp() {
  return (
    <>
      <ShortNavbar />
      <OtpForm />
      <OtpNew/>
    </>
  );
}

Otp.getLayout = function getLayout(page) {
  return <>{page}</>;
};
