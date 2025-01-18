import { useAuth } from "./hooks/useAuth";
import SignIn from "./components/SignIn";
import UserDashboard from "./components/UserDashboard";

const App = () => {
  const { user, isLoading } = useAuth();

  return (
    <div style={{ textAlign: "center" }}>
      {isLoading ? <div>Loading...</div> : user ? <UserDashboard /> : <SignIn />}
    </div>
  );
};

export default App;