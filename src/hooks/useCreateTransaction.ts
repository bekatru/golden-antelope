import { addDoc, collection, doc } from "firebase/firestore";
import { db, auth } from "../services/firebase";

export const useCreateTransaction = () => {
  const setDocument = async (payload: Transaction) => {
    try {
      const userRef = doc(db, "users", auth.currentUser?.uid!);
      const userTransactionsRef = collection(userRef, "transactions");
      await addDoc(userTransactionsRef, payload);
    } catch (error) {
      console.error(error);
    }
  };

  return setDocument;
};
