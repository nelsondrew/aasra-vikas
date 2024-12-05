import { CASHFREE_API } from "../constants/apiConstants";

export const createCashfreeOrder = async ({ amount, customerEmail, customerPhone, customerId, returnUrl }) => {
    try {
      const response = await fetch(CASHFREE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          customerEmail,
          customerPhone,
          customerId,
          returnUrl,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create Cashfree order');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating Cashfree order:', error.message);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };
  