import { useAuth } from "../hooks/useAuth";
import { DynamicIcon } from "lucide-react/dynamic";

export const SettingsScreen = () => {
  const auth = useAuth();
  return (
    <div id="settings-screen">
      <div id="settings-screen-header">
        <p>{auth.user?.name ?? "Log in to use full potential"}</p>
        <DynamicIcon
          name={auth.user ? "log-out" : "log-in"}
          size={28}
          onClick={auth.user ? auth.logout : auth.login}
          strokeWidth={1}
        />
      </div>
    </div>
  );
};
