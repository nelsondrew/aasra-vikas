import React, { useEffect, useRef, useState } from 'react';
import { load } from "@cashfreepayments/cashfree-js"
import { createCashfreeOrder } from '../../api/cashfreeapi';


const PRODUCTION = 'production'

const IframeComponent = () => {
  const iframeRef = useRef(null);
  const [cashfree, setCashfree] = useState(null)


  // Initialize the CashFree SDK
  const initializeSDK = async () => {
    try {
      let cashfreeObj = await load({
        mode: PRODUCTION,
      })
      setCashfree(cashfreeObj)
    } catch (err) {
      console.error("Error initializing Cashfree SDK", err)
      // @ts-ignore
      setError("Failed to load payment SDK.")
    }
  }

  useEffect(() => {
    initializeSDK()
  }, [])

  const handlePaymentProcessing = async () => {
    let cashfreeObj = cashfree;
    if (!cashfree) {
       cashfreeObj = await load({
        mode: PRODUCTION,
      })
        console.error("Cash free sdk not initialised")
        // return
    }

    try {
        // Call the createCashfreeOrder API to create a payment session
        const { paymentSessionId } = await createCashfreeOrder({
            amount: 1,
            customerEmail: "testuser@example.com",
            customerPhone: "9876543210",
            customerId:  "CUST12345",
            returnUrl: "https://aaasravikas.com/payment-success"
        })

        // Set the checkout options
        const checkoutOptions = {
            paymentSessionId,
            redirectTarget: "_modal", // Use modal for inline checkout
        }

        // Trigger the Cashfree payment checkout
        cashfreeObj.checkout(checkoutOptions).then((result) => {
            if (result.error) {
                iframeRef.current.contentWindow.postMessage({
                  error : "payment failed"
                }, "*");

            } else if (result.redirect) {
                console.log("Payment will be redirected.")
                iframeRef.current.contentWindow.postMessage({
                  msg : "payment will be redirected"
                }, "*");
            } else if (result.paymentDetails) {
                if (result.paymentDetails.paymentMessage === "Success") {
                  iframeRef.current.contentWindow.postMessage({
                    msg : "success"
                  }, "*");
                }
            }
        })
    } catch (err) {
        setError("Payment processing failed.")
        setLoading(false)
    }
}

  // Listen for messages from iframe
  const handleMessageFromIframe = (event) => {
    if (event.data === 'start-payment') {
      handlePaymentProcessing();  // Trigger payment processing when iframe requests it
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessageFromIframe);
    return () => {
      window.removeEventListener('message', handleMessageFromIframe);
    };
  }, []);


  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <iframe
        src="https://loan-app-ten-roan.vercel.app/"
        title="Mobile loan app"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
        }}
      />
    </div>
  );
};

export default IframeComponent;
