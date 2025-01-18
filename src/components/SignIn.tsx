import { useAuth } from "../hooks/useAuth";

const SignIn = () => {
  const { login } = useAuth();

  return (
    <div>
      <h1>Golden Antelope</h1>
      <button onClick={login}>Sign In with Google</button>
    </div>
  );
};

export default SignIn;