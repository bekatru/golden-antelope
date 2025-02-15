import { useState } from "react";
import { AccountDto, useStore } from "../services/zustand";
import { Save, X} from "lucide-react";
import { useNavigate } from "react-router";

export const CreateAccountScreen = () => {
  const navigate = useNavigate();
  const {createAccount} = useStore();

  const [name, setName] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      alert("Please enter a valid name.");
      return;
    }

    if (!currency) {
        alert("Please select currency");
        return;
    }

    const newAccount: AccountDto = {
      name,
      currency,
    };

    createAccount(newAccount);

    // Reset form
    setName("");
    setCurrency("");
  };


  return (
    <form onSubmit={handleSubmit} className="px-4 h-full flex flex-col font-light">
        <input
          autoFocus
          autoComplete="off"
          autoCorrect="none"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 text-right focus:outline-0 text-2xl placeholder:text-gray-500"
          required
        />

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 text-right focus:outline-0 text-2xl placeholder:text-gray-500"
          required
        >
          <option value="" disabled>select currency</option>
          <option value="usd">USD</option>
          <option value="kgs">KGS</option>
          <option value="eur">EUR</option>
        </select>

      
      <div className="mt-auto w-full border-t border-gray-500 flex justify-evenly">
        <X onClick={() => navigate(-1)} size={28} strokeWidth={1} className="flex-1 py-4 box-content"/>
        <button type="submit" className="flex-1 py-4 box-content flex justify-center">
          <Save size={28} strokeWidth={1} />
        </button>
      </div>

    </form>
  );
};
