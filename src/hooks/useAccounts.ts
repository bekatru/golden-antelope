import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { useEffect, useState } from "react";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<DocumentData[]>([]);

  const getDocument = async () => {
    const documents: DocumentData[] = [];
    const querySnapshot = await getDocs(
      collection(db, "users", auth.currentUser?.uid!, "accounts")
    );
    querySnapshot.forEach((doc) => {
      documents.push(doc.data());
    });
    setAccounts(documents);
  };

  useEffect(() => {
    getDocument();
  }, []);

  return { accounts, refetch: getDocument };
};
