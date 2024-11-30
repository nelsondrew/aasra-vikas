import { useEffect } from "react";



const RazorpayButton = ({ isLoading  , onSuccess }) => {
    const handlePayment = async () => {
        try {
            // Step 1: Create an order from the server
            const response = await fetch("/api/createOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 199, currency: "INR" }), // Example amount: ₹500
            });
            const order = await response.json();

            if (!order.id) {
                console.error("Order creation failed");
                return;
            }

            // Step 2: Initialize Razorpay checkout
            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Aasra vikas",
                description: "Test Transaction",
                order_id: order.id,
                handler: function (response) {
                    console.log("Payment Details:", response);
                    onSuccess();
                },
                prefill: {
                    name: "Test User",
                    email: "test.user@example.com",
                    contact: "9999999999",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Error during payment:", error.message);
        }
    };

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return <button className="payment-button" disabled={isLoading} onClick={handlePayment}>Pay ₹199</button>;
};

export default RazorpayButton;
