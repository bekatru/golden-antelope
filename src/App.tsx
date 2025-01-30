import { useAuth } from "./hooks/useAuth";
import { BrowserRouter, Route, Routes } from "react-router";
import { SettingsScreen, SignInScreen } from "./screens";
import { BottomTabsLayout } from "./components/BottomTabs/BottomTabsLayout";

const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {!user ? (
        <SignInScreen />
      ) : (
        <Routes>
          <Route path="/" element={<BottomTabsLayout />}>
            <Route index path="add" element={<div>add</div>} />
            <Route path="transactions" element={<div>transactions</div>} />
            <Route path="accounts" element={<div>accounts</div>} />
            <Route path="settings" element={<SettingsScreen/>} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
