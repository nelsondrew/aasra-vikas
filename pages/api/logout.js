import { adminAuth } from "../../firebase/authAdmin";


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { uid } = req.body; // Pass the UID from the client

    try {
      // Revoke the refresh token for the user
      await adminAuth.revokeRefreshTokens(uid);

      // Optionally, you can check when the tokens were revoked
      const userRecord = await adminAuth.getUser(uid);
      const revocationTime = userRecord.tokensValidAfterTime;
      console.log(`Tokens for user ${uid} revoked at ${new Date(revocationTime)}`);

      res.status(200).json({ message: "Tokens revoked successfully" });
    } catch (error) {
      console.error("Error revoking refresh tokens:", error);
      res.status(500).json({ error: "Failed to revoke tokens" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
