import { useAuth } from "../hooks/useAuth";
import { DynamicIcon } from "lucide-react/dynamic";

export const SignInScreen = () => {
  const { login, loading } = useAuth();

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <DynamicIcon
        className={loading ? "loader-circle" : "log-in"}
        name={loading ? "loader-circle" : "log-in"}
        size={56}
        onClick={login}
      />
    </div>
  );
};
