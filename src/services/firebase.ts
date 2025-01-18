import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../../firebase-config.json";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);