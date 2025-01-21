import { useState } from "react";

type AccountFormProps = {
  onSubmit: (account: Account) => void;
};

const AccountForm = ({ onSubmit }: AccountFormProps) => {
  const [formData, setFormData] = useState<Account>({
    name: "",
    currency: "usd",
  });

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
    <form onSubmit={handleFormSubmit}>
      <label>
        name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Savings"
          required
        />
      </label>
      <label>
        currency
        <select
          name="currency"
          value={formData.currency}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select currency
          </option>
          <option value="usd">usd</option>
          <option value="kgs">kgs</option>
        </select>
      </label>
      <button type="submit">create account</button>
    </form>
  );
};

export default AccountForm;
