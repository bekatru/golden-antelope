import { useAuth } from "../hooks/useAuth";
import AccountForm from "./AccountForm";
import { useAccounts } from "../hooks/useAccounts";
import { useCreateAccount } from "../hooks/useCreateAccount";
import TransactionForm from "./TransactionForm";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import { useTransactions } from "../hooks/useTransactions";

type Account = {
  name: string;
  currency: "usd" | "kgs";
};

const UserDashboard = () => {
  const { user } = useAuth();
  const { data: accounts, refetch: refetchAccounts } = useAccounts();
  const {data: transactions, refetch: refetchTransactions} = useTransactions();
  const createAccount = useCreateAccount();
  const createTransaction = useCreateTransaction();

  const handleAccountSubmit = (account: Account) => {
    createAccount(account).then(refetchAccounts);
  };
  const handleTransactionSubmit = (transaction: Transaction) => {
    createTransaction(transaction).then(refetchTransactions);
  };

  if (!user) {
    return <div>No user information available.</div>;
  }

  if (!accounts.length) {
    return (
      <div>
        <p>
          hi <b>{user.name}</b>,<br />
          first let's create an <u>account</u>
        </p>
        <AccountForm onSubmit={handleAccountSubmit} />
      </div>
    );
  }
  if (!transactions.length) {
    return (
        <TransactionForm onSubmit={handleTransactionSubmit}/>
    );
  }

  return (
    <ol>
      {transactions.map((transaction) => <li key={transaction.id}>
        <text>-{transaction.amount} from {JSON.stringify(transaction.account, null, 2)}</text>
        {transaction.note && <text>{transaction.note}</text>}
      </li>)}
    </ol>
  )
};

export default UserDashboard;
