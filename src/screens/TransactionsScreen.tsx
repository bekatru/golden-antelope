import { Plus } from "lucide-react";
import { useStore } from "../services/zustand";
import { NavLink } from "react-router";
import { useMemo } from "react";

export const TransactionsScreen = () => {
  const { transactions } = useStore();

  const memoizedTrx = useMemo(
    () => Object.values(transactions).slice().reverse(),
    [transactions]
  );
  
  return (
    <div
      id="transactions-screen-container"
      className="h-full flex flex-col justify-end"
    >
      <div className="max-h-full overflow-scroll">
        {memoizedTrx.map(
          ({ id, createdAt, amount, type, fromAccount, toAccount }) => (
            <NavLink key={id} to={`/view/transaction/${id}`}>
            <div
              className="flex flex-row justify-between py-3 mx-4 text-xl font-extralight"
            >
              <div className="text-gray-500">
                {new Date(createdAt).toLocaleDateString()}
              </div>
              <div
                className={
                  type === "expense"
                    ? "text-red-500"
                    : type === "income"
                    ? "text-green-500"
                    : "text-black"
                }
              >
                {type === "expense" ? "-" : type === "income" ? "+" : "="}
                {amount} {fromAccount?.currency ?? toAccount?.currency}
              </div>
            </div>
            </NavLink>
          )
        )}
      </div>
      <NavLink to={"/create/transaction"}>
        <div className="py-3 mx-4 border-t border-gray-500 flex justify-center">
          <Plus size={28} strokeWidth={1} />
        </div>
      </NavLink>
    </div>
  );
};
