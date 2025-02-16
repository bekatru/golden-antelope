import { useState } from "react";
import { useStore } from "../services/zustand";
import { Trash, X } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export const TransactionDetailScreen = () => {
  const navigate = useNavigate();
  const params = useParams() as { transactionId: string };
  const { accounts, categories, transactions, deleteTransaction } = useStore();

  const transaction: ITransaction | undefined = transactions[params.transactionId];

  const [amount, setAmount] = useState<number>(transaction?.amount ?? NaN);
  const [note, setNote] = useState<string>(transaction?.note ?? "");
  const [fromAccountId, setFromAccountId] = useState<string>(
    transaction?.fromAccount?.id ?? ""
  );
  const [toAccountId, setToAccountId] = useState<string>(
    transaction?.toAccount?.id ?? ""
  );
  const [type, setType] = useState<TransactionType>(transaction?.type);
  const [categoryId, setCategoryId] = useState<string>(
    transaction?.category?.id ?? ""
  );
  const [conversionRate, setConversionRate] = useState<number>(
    transaction?.conversionRate ?? 1
  );

  const handleSubmit = (_: React.FormEvent) => {
    // e.preventDefault();
    // if (amount === "" || amount <= 0) {
    //   alert("Please enter a valid amount.");
    //   return;
    // }
    // const newTransaction: TransactionDto = {
    //   amount: Number(amount),
    //   type,
    //   note: note || null,
    //   conversionRate: conversionRate || null,
    //   fromAccount: accounts[fromAccountId] || null,
    //   toAccount: accounts[toAccountId] || null,
    //   category: categories[categoryId] || null,
    // };
    // createTransaction(newTransaction);
    // // Reset form
    // setAmount("");
    // setNote("");
    // setFromAccountId("");
  };

  const handleDeleteButtonPress = () => {
    const confirmation = confirm('delete transaction?');
    if (confirmation) {
      deleteTransaction(transaction);
      navigate(-1);
    }
  }

  const accountsArray = Object.values(accounts);

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 h-full flex flex-col font-[250]"
    >
      <select
        disabled
        value={type}
        onChange={(e) => setType(e.target.value as TransactionType)}
        className="w-full p-2 text-right focus:outline-0 text-2xl placeholder:text-gray-500"
        required
      >
        <option value={"expense" as TransactionType}>expense</option>
        <option value={"income" as TransactionType}>income</option>
        <option value={"transfer" as TransactionType}>transfer</option>
      </select>

      <input
        disabled
        autoFocus
        type="number"
        inputMode="decimal"
        autoComplete="off"
        placeholder="amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-2 text-right focus:outline-0 text-2xl"
        required
      />

      {type != "income" && (
        <select
          disabled
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
          className="w-full p-2 text-right focus:outline-0 text-2xl placeholder:text-gray-500"
          required
        >
          <option key={"select-account"} value={""} disabled>
            from account
          </option>
          {accountsArray.map(({ id, name }) => (
            <option key={id} value={id} disabled={id === toAccountId}>
              from {name}
            </option>
          ))}
        </select>
      )}

      {type != "expense" && (
        <select
          disabled
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
          className="w-full p-2 text-right focus:outline-0 text-2xl placeholder:text-gray-500"
          required
        >
          <option key={"select-account"} value={""} disabled>
            to account
          </option>
          {accountsArray.map(({ id, name }) => (
            <option key={id} value={id} disabled={id === fromAccountId}>
              to {name}
            </option>
          ))}
        </select>
      )}

      {type == "transfer" &&
        accounts[fromAccountId]?.currency !=
          accounts[toAccountId]?.currency && (
          <input
            disabled
            autoFocus
            type="number"
            inputMode="decimal"
            autoComplete="off"
            placeholder="rate"
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full p-2 text-right focus:outline-0 text-2xl"
            required
          />
        )}

      {transaction?.category && <select
        disabled
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full p-2 text-right focus:outline-0 text-2xl placeholder:text-gray-500"
      >
        <option value="" disabled>
          select category
        </option>
        {Object.values(categories).map(({ name, id }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>}

      {transaction?.note && <textarea
        placeholder="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 focus:outline-0 text-2xl text-right"
          disabled
      />}

      <div className="mt-auto w-full border-t flex justify-evenly">
        <X
          onClick={() => navigate(-1)}
          size={28}
          strokeWidth={1}
          className="flex-1 py-4 box-content"
        />
        <Trash
          onClick={handleDeleteButtonPress}
          size={28}
          strokeWidth={1}
          className="flex-1 py-4 box-content"
        />
        {/* <button
          type="submit"
          className="flex-1 py-4 box-content flex justify-center"
        >
          <Save size={28} strokeWidth={1} />
        </button> */}
      </div>
    </form>
  );
};
