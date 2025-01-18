import { useAuth } from "../hooks/useAuth";
import AccountForm from "./AccountForm";
import { useAccounts } from "../hooks/useAccounts";
import { useCreateAccount } from "../hooks/useCreateAccount";

type Account = {
  name: string;
  currency: "usd" | "kgs";
};

const UserDashboard = () => {
  const { user } = useAuth();
  const { accounts, refetch } = useAccounts();
  const createAccount = useCreateAccount();

  const handleAccountSubmit = (account: Account) => {
    createAccount(account).then(refetch);
  };

  if (!user) {
    return <div>No user information available.</div>;
  }

  if (!accounts.length) {
    return (
      <div style={{ width: "100vw" }}>
        <h2>
          Welcome, {user.name}
          <br />
          First create an Account
        </h2>

        <AccountForm onSubmit={handleAccountSubmit} />
      </div>
    );
  }

  return null;
};

export default UserDashboard;
