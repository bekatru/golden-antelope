interface AmountInputProps {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const AmountInput = (props: AmountInputProps) => {
  return (
    <input
      autoFocus
      disabled={props.disabled}
      type="number"
      inputMode="decimal"
      autoComplete="off"
      placeholder="amount"
      value={props.value}
      onChange={(e) => props.onChange?.(e.target.value)}
      className="w-full py-2 text-right focus:outline-0"
      required
    />
  );
};
