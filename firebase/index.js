import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXuxrDtL2WEk2dYoRwGx68ImqZ--2UUuA",
    authDomain: "aasra-vikas.firebaseapp.com",
    projectId: "aasra-vikas",
    storageBucket: "aasra-vikas.firebasestorage.app",
    messagingSenderId: "443068244688",
    appId: "1:443068244688:web:41aa735abad528d2d4f4d5"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };

