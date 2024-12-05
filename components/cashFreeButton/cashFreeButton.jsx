import { load } from "@cashfreepayments/cashfree-js";
import { createCashfreeOrder } from "../../api/cashfreeapi";
import { PAYMENT_STRING, PROCESSING_FEE, PRODUCTION, REDIRECT_URL, TEST_EMAIL } from "../../constants/constants";
import { useEffect, useState } from "react";


function CashFreeButton({
  mobileNumber,
  customerId
}) {
  const [cashfree ,setCashfree] = useState(null);
  const initializeSDK = async function () {
    let cashFreeObj = await load({
      mode: PRODUCTION,
    });
    setCashfree(cashFreeObj)
  };

  useEffect(() => {
    initializeSDK();
  },[]);



  const doPayment = async () => {
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
        console.log(result.error);
      }
      if (result.redirect) {
        // This will be true when the payment redirection page couldnt be opened in the same window
        // This is an exceptional case only when the page is opened inside an inAppBrowser
        // In this case the customer will be redirected to return url once payment is completed
        console.log("Payment will be redirected");
      }
      if (result.paymentDetails) {
        console.log(result.paymentDetails.paymentMessage);
      }
    });
  };

  return (
    <div>
      <button
        className="payment-button"
        id="renderBtn"
        onClick={doPayment}
      >
        {PAYMENT_STRING}
      </button>
    </div>
  );
}
export default CashFreeButton;
