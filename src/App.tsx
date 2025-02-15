import { BrowserRouter, Route, Routes } from "react-router";
import {  AccountsScreen, CreateAccountScreen, CreateCategoryScreen, CreateTransactionScreen, SettingsScreen, TransactionsScreen } from "./screens";
import { BottomTabsLayout } from "./components/BottomTabs/BottomTabsLayout";
import { BaseLayout } from "./components/BaseLayout/BaseLayout";

const App = () => {
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
