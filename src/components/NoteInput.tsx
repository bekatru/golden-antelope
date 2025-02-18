interface NoteInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const NoteInput = (props: NoteInputProps) => {
  return (
    <textarea
      placeholder="note"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className="w-full py-2 focus:outline-0 text-right"
    />
  );
};
