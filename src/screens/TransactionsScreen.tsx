import { Plus } from "lucide-react";
import { useStore } from "../services/zustand";
import { NavLink } from "react-router";
import { useEffect, useMemo } from "react";
import { CURRENCIES } from "../constants/currencies";

export const TransactionsScreen = () => {
  const { transactions } = useStore();

  const memoizedTrx: TTransaction[] = useMemo(
    () =>
      Object.values(transactions)
        .slice()
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
    [transactions]
  );

  useEffect(() => {
    const anchor = document.getElementById("anchor");

    if (anchor) {
      anchor.scrollIntoView();
    }
  }, [])

  return (
    <div
      id="transactions-screen-container"
      className="h-full flex flex-col justify-end"
    >
      <div className="scroller max-h-full overflow-scroll px-4">
        {memoizedTrx.map(({ id, createdAt, amount, type, ...transaction }) => (
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
                {/* @ts-ignore */}
                {CURRENCIES[(transaction.fromAccount || transaction.toAccount).currency].symbol}
              </div>
            </div>
          </NavLink>
        ))}
        <div id="anchor"/>
      </div>
      <NavLink to={"/create/transaction"}>
        <div className="py-3 border-t flex justify-center">
          <Plus size={28} strokeWidth={1} />
        </div>
      </NavLink>
    </div>
  );
};
