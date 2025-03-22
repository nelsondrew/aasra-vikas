import type { NextApiRequest, NextApiResponse } from 'next';
import {  Cashfree }  from 'cashfree-pg';

// Initialize Cashfree
Cashfree.XClientId = process.env.CASHFREE_APP_ID!;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY!;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION; // Use SANDBOX for testing

interface OrderRequest {
  amount: number;
  customerEmail: string;
  customerPhone: string;
  customerId: string;
  returnUrl: string;
}

interface OrderResponse {
  orderId?: string;
  paymentSessionId?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderResponse>
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { 
      amount, 
      customerEmail, 
      customerPhone, 
      customerId, 
      returnUrl 
    }: OrderRequest = req.body;

    // Validate required fields
    if (!amount || !customerEmail || !customerPhone || !customerId || !returnUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Construct the order payload
    const orderRequest = {
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId,
        customer_name: "Customer Name", // You can make this dynamic
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: returnUrl,
      },
      order_note: "Payment for registration",
    };

    // Create the order using Cashfree SDK
    const response = await Cashfree.PGCreateOrder("2023-08-01", orderRequest);

    if (response?.data) {
      const { order_id, payment_session_id } = response.data;

      // Return the order details
      return res.status(200).json({
        orderId: order_id,
        paymentSessionId: payment_session_id,
      });
    } else {
      return res.status(500).json({ error: 'Failed to create order' });
    }

  } catch (error: any) {
    console.error('Error creating order:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 