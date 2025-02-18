import { useStore } from "../services/zustand";

interface CategorySelectProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export const CategorySelect = (props: CategorySelectProps) => {
    const {categories} = useStore();
  return (
    <select
      disabled={props.disabled}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className={`w-full py-2 text-right focus:outline-0 ${
        !props.value && "text-[grey]"
      }`}
    >
      <option value="" disabled>
        category
      </option>
      {Object.values(categories).map(({ name, id }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};
