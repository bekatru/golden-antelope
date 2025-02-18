import { useState } from "react";
import { useStore } from "../services/zustand";
import { Pencil, Save, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import {
  AccountSelect,
  AmountInput,
  BackButton,
  CategorySelect,
  ConversionRateInput,
  NoteInput,
  TransactionTypeSelect,
} from "../components";

export const TransactionDetailScreen = () => {
  const navigate = useNavigate();
  const params = useParams() as { transactionId: string };
  const { transactions, deleteTransaction } = useStore();

  const transaction: TTransaction | undefined =
    transactions[params.transactionId];

  const [editMode, setEditMode] = useState(false);

  const [note, setNote] = useState<string>(transaction?.note ?? "");
  const [categoryId, setCategoryId] = useState<string>(
    transaction?.category?.id ?? ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleDeleteButtonPress = () => {
    const confirmation = confirm("delete transaction?");
    if (confirmation) {
      deleteTransaction(transaction);
      navigate(-1);
    }
  };

  const handleEditButtonPress = () => {
    setEditMode(true);
  };

  if (!transaction) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 h-full flex flex-col font-light text-2xl"
    >
      <TransactionTypeSelect disabled value={transaction.type} />

      <AmountInput disabled value={transaction.amount.toString()} />

      {"fromAccount" in transaction && (
        <AccountSelect
          disabled
          value={transaction.fromAccount.id}
          required={transaction.type != "income"}
          placeholderPrefix="from"
        />
      )}
      {"toAccount" in transaction && (
        <AccountSelect
          disabled
          value={transaction.toAccount.id}
          required={transaction.type != "expense"}
          placeholderPrefix="to"
        />
      )}

      {transaction.type == "transfer" &&
        "fromAccount" in transaction &&
        "toAccount" in transaction &&
        transaction.fromAccount.currency != transaction.toAccount.currency && (
          <ConversionRateInput
            disabled
            value={transaction.conversionRate.toString()}
          />
        )}

      {(categoryId || editMode) && (
        <CategorySelect
          disabled={!editMode}
          value={categoryId}
          onChange={setCategoryId}
        />
      )}

      {(note || editMode) && (
        <NoteInput disabled={!editMode} value={note} onChange={setNote} />
      )}

      <div className="mt-auto w-full border-t flex justify-evenly">
        <BackButton />
        <Trash
          onClick={handleDeleteButtonPress}
          size={28}
          strokeWidth={1}
          className="flex-1 py-4 box-content text-red-500"
        />
        {!editMode ? (
          <Pencil
            onClick={handleEditButtonPress}
            size={28}
            strokeWidth={1}
            className="flex-1 py-4 box-content"
          />
        ) : (
          <button
            type="submit"
            className="flex-1 py-4 box-content flex justify-center"
          >
            <Save size={28} strokeWidth={1} />
          </button>
        )}
      </div>
    </form>
  );
};
