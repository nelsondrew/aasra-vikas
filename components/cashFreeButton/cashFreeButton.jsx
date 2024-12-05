import { load } from "@cashfreepayments/cashfree-js";
import { createCashfreeOrder } from "../../api/cashfreeapi";
import {
  PAYMENT_STRING,
  PROCESSING_FEE,
  PRODUCTION,
  REDIRECT_URL,
  TEST_EMAIL,
} from "../../constants/constants";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledCashFreeButtonContainer = styled.div`
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function CashFreeButton({ mobileNumber, customerId, onSuccess }) {
  const [cashfree, setCashfree] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const initializeSDK = async function () {
    let cashFreeObj = await load({
      mode: PRODUCTION,
    });
    setCashfree(cashFreeObj);
  };

  useEffect(() => {
    initializeSDK();
  }, []);

  const doPayment = async () => {
    setLoading(true);
    const { paymentSessionId } = await createCashfreeOrder({
      amount: PROCESSING_FEE,
      customerEmail: TEST_EMAIL,
      customerPhone: mobileNumber,
      customerId: customerId,
      returnUrl: REDIRECT_URL,
    });
    let checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: "_modal",
    };
    cashfree.checkout(checkoutOptions).then((result) => {
      if (result.error) {
        setError(result.error);
        setLoading(false);
      }
      if (result.redirect) {
        // This will be true when the payment redirection page couldnt be opened in the same window
        // This is an exceptional case only when the page is opened inside an inAppBrowser
        // In this case the customer will be redirected to return url once payment is completed
        console.log("Payment will be redirected");
        setLoading(false);
      }
      if (result.paymentDetails) {
        if (typeof result?.paymentDetails?.paymentMessage === "string") {
          setLoading(false);
          onSuccess();
        }
      }
    });
  };

  return (
    <StyledCashFreeButtonContainer>
      <button className="payment-button" id="renderBtn" onClick={doPayment}>
        {loading ? <div className="loader" /> : PAYMENT_STRING}
      </button>
    </StyledCashFreeButtonContainer>
  );
}
export default CashFreeButton;
