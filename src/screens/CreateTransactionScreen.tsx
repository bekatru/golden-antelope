import { useState } from "react";
import { useStore } from "../services/zustand";
import { Save, X } from "lucide-react";
import { useNavigate } from "react-router";
import { Expense, Income, Transfer } from "../modules/transaction";

export const CreateTransactionScreen = () => {
  const navigate = useNavigate();
  const { createTransaction, accounts, categories } = useStore();

  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [fromAccountId, setFromAccountId] = useState<string>("");
  const [toAccountId, setToAccountId] = useState<string>("");
  const [type, setType] = useState<TransactionType>("expense");
  const [categoryId, setCategoryId] = useState<string>("");
  const [conversionRate, setConversionRate] = useState<string>("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount === undefined) {
      return;
    }

    const newTransaction: TransactionDto = {
      type,
      amount: Number(amount),
      note: note || null,
      category: categories[categoryId] || null,
    };

    switch (type) {
      case "income":
        createTransaction(
          new Income({
            ...newTransaction,
            toAccount: accounts[toAccountId],
          })
        );
        break;
      case "expense":
        createTransaction(
          new Expense({
            ...newTransaction,
            fromAccount: accounts[fromAccountId],
          })
        );
        break;
      case "transfer":
        createTransaction(
          new Transfer({
            ...newTransaction,
            toAccount: accounts[toAccountId],
            fromAccount: accounts[fromAccountId],
            conversionRate: Number(conversionRate),
          })
        );
        break;
    }


    // Reset form
    setAmount("");
    setNote("");
    setFromAccountId("");
  };

  const accountsArray = Object.values(accounts);

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 h-full flex flex-col font-light"
    >
      <select
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
        autoFocus
        type="number"
        inputMode="decimal"
        autoComplete="off"
        placeholder="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 text-right focus:outline-0 text-2xl"
        required
      />

      {type != "income" && (
        <select
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

      {
        type == 'transfer' &&
        accounts[fromAccountId]?.currency != accounts[toAccountId]?.currency &&
        <input
          autoFocus
          type="number"
          inputMode="decimal"
          autoComplete="off"
          placeholder="rate"
          value={conversionRate}
          onChange={(e) => setConversionRate(e.target.value)}
          className="w-full p-2 text-right focus:outline-0 text-2xl"
          required
        />
      }

      <select
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
      </select>

      <textarea
        placeholder="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 focus:outline-0 text-2xl text-right"
      />

      <div className="mt-auto w-full border-t flex justify-evenly">
        <X
          onClick={() => navigate(-1)}
          size={28}
          strokeWidth={1}
          className="flex-1 py-4 box-content"
        />
        <button
          type="submit"
          className="flex-1 py-4 box-content flex justify-center"
        >
          <Save size={28} strokeWidth={1} />
        </button>
      </div>
    </form>
  );
};
