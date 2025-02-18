import { useStore } from "../services/zustand";

interface AccountSelectProps {
  value: string;
  placeholderPrefix: string;
  disabledOptionIds?: string[];
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

export const AccountSelect = (props: AccountSelectProps) => {
  const { accounts } = useStore();
  return (
    <select
      disabled={props.disabled}
      value={props.value}
      onChange={(e) => props.onChange?.(e.target.value)}
      className={`w-full py-2 text-right focus:outline-0 ${
        !props.value && "text-[grey]"
      }`}
      required={props.required}
    >
      <option value="" disabled>
        {props.placeholderPrefix} account
      </option>
      {Object.values(accounts).map(({ name, id }) => (
        <option key={id} value={id} disabled={props.disabledOptionIds?.includes(id)}>
          {props.placeholderPrefix} {name}
        </option>
      ))}
    </select>
  );
};
