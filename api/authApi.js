import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/index"

async function signInAndGetToken({
    email,
    password
}) {
  try {
    // Sign in the user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Get the ID token (JWT) from the authenticated user
    const idToken = await userCredential.user.getIdToken();


    // Now you can use this token for route protection or send it to your server
    return idToken;
  } catch (error) {
    console.error("Authentication failed:", error.message);
  }
}


export default signInAndGetToken;