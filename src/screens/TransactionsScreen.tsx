import { Plus } from "lucide-react";
import { useStore } from "../services/zustand";
import { NavLink } from "react-router";
import { useMemo } from "react";

export const TransactionsScreen = () => {
  const { transactions } = useStore();

  const memoizedTrx = useMemo(
    () =>
      Object.values(transactions)
        .slice()
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
    [transactions]
  );

  return (
    <div
      id="transactions-screen-container"
      className="h-full flex flex-col justify-end px-4"
    >
      <div className="max-h-full overflow-scroll">
        {memoizedTrx.map(({ id, createdAt, amount, type }) => (
          <NavLink key={id} to={`/view/transaction/${id}`}>
            <div className="flex flex-row justify-between py-3 text-xl font-light">
              <div>
                {new Date(createdAt).toLocaleDateString()}
              </div>
              <div
                className={
                  type === "expense"
                    ? "text-red-500"
                    : type === "income"
                    ? "text-green-500"
                    : ""
                }
              >
                {type === "expense" ? "-" : type === "income" ? "+" : "="}
                {amount}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      <NavLink to={"/create/transaction"}>
        <div className="py-3 border-t flex justify-center">
          <Plus size={28} strokeWidth={1} />
        </div>
      </NavLink>
    </div>
  );
};
