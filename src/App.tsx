import { BrowserRouter, Route, Routes } from "react-router";
import { SettingsScreen, TransactionsScreen } from "./screens";
import { BottomTabsLayout } from "./components/BottomTabs/BottomTabsLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BottomTabsLayout />}>
          <Route index path="transactions" element={<TransactionsScreen/>} />
          <Route path="accounts" element={<div>accounts</div>} />
          <Route path="settings" element={<SettingsScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
