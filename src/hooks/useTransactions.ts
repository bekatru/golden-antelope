import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { useEffect, useState } from "react";

export const useTransactions = () => {
  const [data, setData] = useState<DocumentData[]>([]);

  const getDocument = async () => {
    const documents: DocumentData[] = [];
    const querySnapshot = await getDocs(
      collection(db, "users", auth.currentUser?.uid!, "transactions")
    );
    querySnapshot.forEach((doc) => {
      documents.push({id: doc.id, ...doc.data()});
    });
    setData(documents);
  };

  useEffect(() => {
    getDocument();
  }, []);

  return { data, refetch: getDocument };
};
