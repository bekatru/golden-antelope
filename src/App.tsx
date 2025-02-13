import { BrowserRouter, Route, Routes } from "react-router";
import {  CreateTransactionScreen, SettingsScreen, TransactionsScreen } from "./screens";
import { BottomTabsLayout } from "./components/BottomTabs/BottomTabsLayout";
import { BaseLayout } from "./components/BaseLayout/BaseLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<BottomTabsLayout />}>
          <Route index path="transactions" element={<TransactionsScreen/>} />
          <Route path="accounts" element={<div>accounts</div>} />
          <Route path="settings" element={<SettingsScreen />} />
        </Route>
        
        <Route path="/create" element={<BaseLayout/>}>
          <Route path="transaction" element={<CreateTransactionScreen/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
