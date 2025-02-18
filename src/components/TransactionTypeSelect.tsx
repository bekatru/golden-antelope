interface TransactionTypeSelectProps {
  value: TransactionType;
  onChange?: (value: TransactionType) => void;
  disabled?: boolean;
}

export const TransactionTypeSelect = (props: TransactionTypeSelectProps) => {
  return (
    <select
      disabled={props.disabled}
      value={props.value}
      onChange={(e) => props.onChange?.(e.target.value as TransactionType)}
      className="w-full py-2 text-right focus:outline-0"
      required
    >
      <option value={"expense" as TransactionType}>expense</option>
      <option value={"income" as TransactionType}>income</option>
      <option value={"transfer" as TransactionType}>transfer</option>
    </select>
  );
};
