import styled from "styled-components";
import CallToAction from "../components/callToAction/CallToAction";
import Planning from "../components/common/Planning";
import Faq from "../components/faq/Faq";
import AppInfo from "../components/home/AppInfo";
import BankioCard from "../components/home/BankioCard";
import BusinessSolutions from "../components/home/BusinessSolutions";
import Features from "../components/home/Features";
import HomeBanner from "../components/home/HomeBanner";
import LatestArticles from "../components/home/LatestArticles";
import Personalized from "../components/home/Personalized";
import Testimonials from "../components/home/Testimonials";
import Loan from "../components/personalLoan/Loan";
import CreditHistory from "../components/personalLoan/CreditHistory";
import PayEarly from "../components/personalLoan/PayEarly";
import GetPersonal from "../components/personalLoan/GetPersonal";
import HowItWork from "../components/carLoan/HowItWork";

const LoanContainer = styled.div`
  margin-bottom: 5rem;
`;

export default function Home() {
  return (
    <>
      <HomeBanner />
      <LoanContainer>
        <Loan />
      </LoanContainer>
      <HowItWork />
      <CreditHistory />
      <PayEarly />
      <GetPersonal />
      {/* <Features /> */}
      {/* <BusinessSolutions /> */}
      {/* <AppInfo /> */}
      {/* <BankioCard /> */}
      {/* <CallToAction /> */}
      {/* <Planning /> */}
      {/* <Personalized /> */}
      <Testimonials />
      {/* <LatestArticles /> */}
      <Faq />
    </>
  );
}
