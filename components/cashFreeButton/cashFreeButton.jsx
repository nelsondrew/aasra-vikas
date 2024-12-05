import { load } from "@cashfreepayments/cashfree-js";
import { createCashfreeOrder } from "../../api/cashfreeapi";

function Checkout() {
  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "production",
    });
  };
  initializeSDK();

  const doPayment = async () => {
    const { paymentSessionId } = await createCashfreeOrder({
      amount: 1,
      customerEmail: "test@test.com",
      customerPhone: "9999999999",
      customerId: "abcdsees",
      returnUrl: "blank.com",
    });
    let checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: "_modal",
    };
    cashfree.checkout(checkoutOptions).then((result) => {
      if (result.error) {
        // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
        console.log(
          "User has closed the popup or there is some payment error, Check for Payment Status"
        );
        console.log(result.error);
      }
      if (result.redirect) {
        // This will be true when the payment redirection page couldnt be opened in the same window
        // This is an exceptional case only when the page is opened inside an inAppBrowser
        // In this case the customer will be redirected to return url once payment is completed
        console.log("Payment will be redirected");
      }
      if (result.paymentDetails) {
        // This will be called whenever the payment is completed irrespective of transaction status
        console.log("Payment has been completed, Check for Payment Status");
        console.log({
            result
        })
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
        Pay ₹199
      </button>
    </div>
  );
}
export default Checkout;
