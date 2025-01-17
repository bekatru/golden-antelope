import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import firebaseConfig from '../firebase-config.json';

// Initialize Firebase

import './App.css'
import { useState } from "react";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

type User = {
  name: string | null,
  email: string | null,
  photo: string | null,
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, authProvider);
      const user = result.user;
      setUser({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
    } catch (error) {
      console.error("Error during sign-in", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during sign-out", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          {user.photo && user.name && <img src={user.photo} alt={user.name} width="100" />}
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Sign In with Google</button>
      )}
    </div>
  );
};

export default App;
