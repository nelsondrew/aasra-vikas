import Razorpay from "razorpay";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { amount, currency } = req.body;

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        try {
            const order = await razorpay.orders.create({
                amount: amount * 100, // Convert amount to smallest currency unit
                currency: currency || "INR",
                receipt: `receipt_${Date.now()}`,
            });
            res.status(200).json(order);
        } catch (error) {
            console.error("Error creating Razorpay order:", error);
            res.status(500).json({ error: "Unable to create order" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
