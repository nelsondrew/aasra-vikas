interface CreateOrderParams {
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

export const createOrder = async (params: CreateOrderParams): Promise<OrderResponse> => {
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    return { error: 'Failed to create order' };
  }
}; 