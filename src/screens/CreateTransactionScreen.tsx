import { useState } from "react";
import { TransactionDto, TransactionType, useStore } from "../services/zustand";
import { Save, X} from "lucide-react";
import { useNavigate } from "react-router";

export const CreateTransactionScreen = () => {
  const navigate = useNavigate();
  const {createTransaction, accounts} = useStore();

  const [amount, setAmount] = useState<number | "">("");
  const [note, setNote] = useState<string>("");
  const [fromAccountId, setFromAccountId] = useState<string>("");
  const [toAccountId, setToAccountId] = useState<string>("");
  const [type, setType] = useState<TransactionType>("expense");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount === "" || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newTransaction: TransactionDto = {
      amount: Number(amount),
      note: note || null,
      type,
      fromAccount: accounts.find(({id}) => id == fromAccountId) || null,
      toAccount: accounts.find(({id}) => id == toAccountId) || null,
    };

    createTransaction(newTransaction);
    
    // Reset form
    setAmount("");
    setNote("");
    setFromAccountId("")
  };


  return (
    <form onSubmit={handleSubmit} className="px-4 h-full flex flex-col font-light">
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
          onChange={(e) => setAmount(Number(e.target.value) || "")}
          className="w-full p-2 text-right focus:outline-0 text-2xl"
          required
        />

        {type != 'income' && <select
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
          className="w-full p-2 text-right focus:outline-0 text-2xl placeholder:text-gray-500"
          required
        >
          <option key={'select-account'} value={""} disabled>from account</option>
          {
            accounts.map(({id, name}) => (
              <option key={id} value={id} disabled={id === toAccountId}>from {name}</option>
            ))
          }
        </select>}

        {type != 'expense' && <select
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
          className="w-full p-2 text-right focus:outline-0 text-2xl placeholder:text-gray-500"
          required
        >
          <option key={'select-account'} value={""} disabled>to account</option>
          {
            accounts.map(({id, name}) => (
              <option key={id} value={id} disabled={id === fromAccountId}>to {name}</option>
            ))
          }
        </select>}

        <textarea
          placeholder="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 focus:outline-0 text-2xl text-right"
        />

      <div className="w-full mt-auto border-t border-gray-500 flex justify-evenly">
        <X onClick={() => navigate(-1)} size={28} strokeWidth={1} className="flex-1 py-4 box-content"/>
        <button type="submit" className="flex-1 py-4 box-content flex justify-center">
          <Save size={28} strokeWidth={1} />
        </button>
      </div>

    </form>
  );
};
