import { Cashfree } from "cashfree-pg";

Cashfree.XClientId = process.env.CASHFREE_APP_ID; // Add your App ID in .env.local
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY; // Add your Secret Key in .env.local
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION; // Use PRODUCTION for live environment

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { amount, customerEmail, customerPhone, customerId, returnUrl } =
      req.body;

    // Validate required fields
    if (
      !amount ||
      !customerEmail ||
      !customerPhone ||
      !customerId ||
      !returnUrl
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create the order payload
    const orderRequest = {
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId,
        customer_name: "Customer Name", // Optionally, replace with dynamic data
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_note: "Payment for registration",
    };

    // Use the Cashfree SDK to create the order
    const response = await Cashfree.PGCreateOrder("2023-08-01", orderRequest);

    if (response && response.data) {
      // Respond with the generated order token and ID
      const { order_id, payment_session_id } = response.data;
      return res
        .status(200)
        .json({ orderId: order_id, paymentSessionId: payment_session_id });
    } else {
      return res.status(500).json({ error: "Failed to create order" });
    }
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
}
