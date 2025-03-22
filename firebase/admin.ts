import * as admin from 'firebase-admin';

// Initialize Firebase Admin
const initializeFirebase = () => {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
      });

      console.log('Firebase Admin initialized successfully');
    }

    const db = admin.firestore();
    const storage = admin.storage();
    
    // Verify storage bucket connection
    const bucket = storage.bucket();
    bucket.get().then(() => {
      console.log('Storage bucket connected successfully');
    }).catch((error) => {
      console.error('Error connecting to storage bucket:', error);
    });

    return {
      db,
      admin,
      storage
    };
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
  }
};

// Export the initialized services
const { db, storage } = initializeFirebase();
export { db, admin, storage }; 