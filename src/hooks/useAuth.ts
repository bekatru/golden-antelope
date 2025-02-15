import { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged, signInWithPopup, setPersistence, browserLocalPersistence, signOut, GoogleAuthProvider, User } from "firebase/auth";


export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setIsLoading] = useState(true);
  const authProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, authProvider);
    } catch (error) {
      console.error("Error during sign-in", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during sign-out", error);
    }
  };

  return { user, loading, login, logout };
};