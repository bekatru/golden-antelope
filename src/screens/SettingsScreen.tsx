import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const SettingsScreen = () => {
  const auth = useAuth();
  return (
    <div id="settings-screen">
      <div id="settings-screen-header">
        <p>{auth.user?.name}</p>        
        <LogOut size={28} onClick={auth.logout} strokeWidth={1}  />
      </div>
    </div>
  );
};
