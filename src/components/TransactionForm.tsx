import { useState } from "react";
import { useAccounts } from "../hooks/useAccounts";

type TransactionFormProps = {
  onSubmit: (account: Transaction) => void;
};

const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  const { data: accounts } = useAccounts();
  const [formData, setFormData] = useState<Transaction>({
    account: "",
    amount: "",
    note: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.account || !formData.amount) {
      alert("Please fill out all fields.");
      return;
    }

    onSubmit(formData);
    setFormData(prev => ({ ...prev, amount: '', note: '' }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        account
        <select
          name="account"
          onChange={handleInputChange}
          value={formData.account}
          required
        >
          <option value={""} disabled>
            Select account
          </option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        amount
        <input
          value={formData.amount}
          name="amount"
          type="number"
          min={0}
          onChange={handleInputChange}
        />
      </label>
      <label>
        note
        <textarea
          value={formData.note}
          name="note"
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">save transaction</button>
    </form>
  );
};

export default TransactionForm;
