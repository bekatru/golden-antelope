import { useRef, useState } from "react";
import { Category, TransactionDto, useStore } from "../services/zustand";
import { Save, X} from "lucide-react";
import { useNavigate } from "react-router";

export const CreateTransactionScreen = () => {
  const navigate = useNavigate();
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

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="px-4 h-full flex flex-col font-light">
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

        <textarea
          placeholder="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 focus:outline-0 text-2xl text-right"
        />

      
      <div className="w-full mt-auto border-t border-gray-500 flex justify-evenly">
        <X onClick={() => navigate(-1)} size={28} strokeWidth={1} className="flex-1 py-4 box-content"/>
        <button type="submit" className="flex-1 py-4 box-content place-items-center">
          <Save onClick={formRef.current?.submit} size={28} strokeWidth={1} />
        </button>
      </div>

    </form>
  );
};
