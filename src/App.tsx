import { BrowserRouter, Route, Routes } from "react-router";
import {  AccountsScreen, CreateAccountScreen, CreateCategoryScreen, CreateTransactionScreen, SettingsScreen, TransactionsScreen } from "./screens";
import { BottomTabsLayout } from "./components/BottomTabs/BottomTabsLayout";
import { BaseLayout } from "./components/BaseLayout/BaseLayout";
import { useEffect } from "react";

import { useStore } from "./services/zustand";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { useAuth } from "./hooks/useAuth";

const dbRef = ref(getDatabase());


const App = () => {
  const {timestamp, accounts, transactions, categories, hydrate} = useStore();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user?.uid) return;

    const userDataRef = child(dbRef, `users/${auth.user.uid}`);

    const persistData = () => set(userDataRef, {
      timestamp,
      accounts,
      transactions,
      categories,
    })

    get(userDataRef)
      .then((snapshot) => {
        
        if (!snapshot.exists() || snapshot.val().timestamp < timestamp) {
          persistData();
        }

        if (snapshot.exists() && snapshot.val().timestamp > timestamp) {
          hydrate(snapshot.val());
        }
      })
      .catch(console.error);

  }, [timestamp, auth.user])

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<BottomTabsLayout />}>
          <Route index path="transactions" element={<TransactionsScreen/>} />
          <Route path="accounts" element={<AccountsScreen/>} />
          <Route path="settings" element={<SettingsScreen />} />
        </Route>
        
        <Route path="/create" element={<BaseLayout/>}>
          <Route path="transaction" element={<CreateTransactionScreen/>}/>
          <Route path="account" element={<CreateAccountScreen/>}/>
          <Route path="category" element={<CreateCategoryScreen/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
