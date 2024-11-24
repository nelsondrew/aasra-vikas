import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth , RecaptchaVerifier } from "firebase/auth"
import firebase from "firebase/app";
import "firebase/auth";
import { getStorage } from "firebase/storage";  // To handle file uploads


// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAXuxrDtL2WEk2dYoRwGx68ImqZ--2UUuA",
//     authDomain: "aasra-vikas.firebaseapp.com",
//     projectId: "aasra-vikas",
//     storageBucket: "aasra-vikas.firebasestorage.app",
//     messagingSenderId: "443068244688",
//     appId: "1:443068244688:web:41aa735abad528d2d4f4d5"
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyAXuxrDtL2WEk2dYoRwGx68ImqZ--2UUuA",
    authDomain: "aasra-vikas.firebaseapp.com",
    projectId: "aasra-vikas",
    storageBucket: "aasra-vikas.firebasestorage.app",
    messagingSenderId: "443068244688",
    appId: "1:443068244688:web:41aa735abad528d2d4f4d5"
  };
  

const app = getApps().length ===0 ?  initializeApp(firebaseConfig, "Aasra Vikas") : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
auth.useDeviceLanguage();
const storage = getStorage(app);  // Initialize Firebase Storage



export { auth , RecaptchaVerifier,  db  , storage};

