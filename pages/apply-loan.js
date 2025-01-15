import IframeComponent from "../components/iframeComponent";

export default function ApplyLoan() {

  return (
    <IframeComponent/>
  )
}


ApplyLoan.getLayout = function getLayout(page) {
  return <>{page}</>;
};
