import { addDoc, collection, doc } from "firebase/firestore";
import { db, auth } from "../services/firebase";

export const useCreateAccount = () => {
  const setDocument = async (payload: {
    name: string;
    currency: "usd" | "kgs";
  }) => {
    try {
      const userRef = doc(db, "users", auth.currentUser?.uid!);
      const userAccountsRef = collection(userRef, "accounts");
      await addDoc(userAccountsRef, payload);
    } catch (error) {
      console.error(error);
    }
  };

  return setDocument;
};
