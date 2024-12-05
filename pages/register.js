import ShortNavbar from "../components/common/ShortNavbar";
import PhoneNumberVerified from "../components/otp/PhoneNumberVerified";
import PaymentPage from "../components/payment/PaymentPage";
import RegisterForm from "../components/Register/RegisterForm";

export default function Register() {
  return (
    <>
      <ShortNavbar />
      <RegisterForm />
      <PhoneNumberVerified/>
      <PaymentPage/>
    </>
  );
}

Register.getLayout = function getLayout(page) {
  return <>{page}</>;
};
