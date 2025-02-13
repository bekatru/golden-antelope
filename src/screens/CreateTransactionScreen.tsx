import { useState } from "react";
import { Category, TransactionDto, useStore } from "../services/zustand";

export const CreateTransactionScreen = () => {
  const {createTransaction} = useStore();

  const [amount, setAmount] = useState<number | "">("");
  const [note, setNote] = useState<string>("");
  const [category, setCategory] = useState<Category | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount === "" || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newTransaction: TransactionDto = {
      amount: Number(amount),
      note: note || null,
      category,
    };

    createTransaction(newTransaction);

    // Reset form
    setAmount("");
    setNote("");
    setCategory(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <label className="block mb-2">
        Amount:
        <input
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value) || "")}
          className="w-full p-2 border rounded"
          required
        />
      </label>

      <label className="block mb-2">
        Note:
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>

      <button type="submit" className="w-full  p-2 rounded mt-2">
        Create Transaction
      </button>
    </form>
  );
};
