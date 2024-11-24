import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "..";


export async function updatePhoneNumber(pan, number) {
  const collectionRef = collection(db, "loan-applicants"); // Replace with your collection name
  const q = query(collectionRef, where("pan", "==", pan)); // Query to find the document
  
  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0]; // Get the first document that matches
      const docRef = doc(db, "loan-applicants", firstDoc.id); // Reference to the document
      await updateDoc(docRef, {
        // Fields you want to update
        mobileNumber: number, // Replace with your field name and value
      });
      console.log(`Document with ID ${firstDoc.id} updated successfully!`);
    } else {
      console.log("No matching document found.");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export async function updateVerificationStatus(number) {
    const collectionRef = collection(db, "loan-applicants"); // Replace with your collection name
    const q = query(collectionRef, where("phoneNumber", "==", number)); // Query to find the document
    
    try {
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0]; // Get the first document that matches
        const docRef = doc(db, "loan-applicants", firstDoc.id); // Reference to the document
        await updateDoc(docRef, {
          // Fields you want to update
          numberVerified: true, // Replace with your field name and value
        });
        console.log(`Document with ID ${firstDoc.id} updated successfully!`);
      } else {
        console.log("No matching document found.");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }
  
