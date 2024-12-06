// pages/api/loanApplicants.js
import { collection,  getDocs } from "firebase/firestore";
import { db } from '../../firebase';

export default async function loanApplicants(req, res) {
  try {
    // Access the loan-applicants collection
    const loanApplicantsRef = collection(db, 'loan-applicants');
    const snapshot = await getDocs(loanApplicantsRef);

    // Map through the documents and structure the data
    const applicants = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Respond with the data
    res.status(200).json({
      data: applicants
    });
  } catch (error) {
    console.error('Error fetching data from Firestore: ', error);
    res.status(500).json({ error: 'Failed to fetch loan applicants' });
  }
}
