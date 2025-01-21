import { useAuth } from "./hooks/useAuth";
import SignIn from "./components/SignIn";
import UserDashboard from "./components/UserDashboard";
import { Loader } from "./components/Loader";

const App = () => {
  const { user, isLoading } = useAuth();

  return (
    <>
      {isLoading ? <Loader/> : user ? <UserDashboard /> : <SignIn />}
    </>
  );
};

export default App;