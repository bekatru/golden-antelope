import { useState } from "react";

type Account = {
  name: string;
  currency: "usd" | "kgs";
};

type AccountFormProps = {
  onSubmit: (account: Account) => void;
};

const AccountForm = ({ onSubmit }: AccountFormProps) => {
  const [formData, setFormData] = useState<Account>({ name: "", currency: "usd" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.currency) {
      alert("Please fill out all fields.");
      return;
    }

    onSubmit(formData);
    setFormData({ name: "", currency: "kgs" });
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ margin: 16, display: 'flex', flexDirection: 'column', rowGap: 16 }}>
      <div>
        <label style={{ display: "flex", flexDirection: "column", fontSize: 18 }}>
          Name:
          <input
            style={{ fontSize: 20 }}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ex: Debit card, Cash, Savings"
            required
          />
        </label>
      </div>
      <div>
        <label style={{ display: "flex", flexDirection: "column", fontSize: 18 }}>
          Currency:
          <select
            style={{ fontSize: 20 }}
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select currency
            </option>
            <option value="usd">USD</option>
            <option value="kgs">KGS</option>
          </select>
        </label>
      </div>
      <button type="submit">Add Account</button>
    </form>
  );
};

export default AccountForm;