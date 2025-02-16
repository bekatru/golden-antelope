import { useMemo } from "react";
import { useStore } from "../services/zustand";

export const AccountsScreen = () => {
  const { accounts } = useStore();

  const totals: [string, number][] = useMemo(() => {
    const totalsMap = Object.values(accounts).reduce((result, account) => {
      if (result[account.currency]) {
        result[account.currency] += account.balance;
      } else {
        result[account.currency] = account.balance;
      }
      return result;
    }, {} as Record<string, number>);

    return Object.entries(totalsMap);
  }, [accounts]);

  return (
    <div
      id="transactions-screen-container"
      className="h-full flex flex-col justify-end text-xl font-light"
    >
      <div className="max-h-full overflow-scroll">
        {Object.values(accounts).map(({ id, name, balance, currency }) => (
          <div key={id} className="flex justify-between py-3 mx-4 ">
            <div className={"text-gray-700"}>{name}</div>
            <div
              className={
                balance > 0
                  ? "text-green-500"
                  : balance < 0
                  ? "text-red-500"
                  : "text-black"
              }
            >
              {balance} {currency}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 mx-4 border-t flex justify-between py-3">
        <div className={"text-gray-700"}>totals</div>
        <div className="flex space-x-4">
          {totals.length ? totals.map(([currency, balance]) => (
            <div
              className={
                balance > 0
                  ? "text-green-500"
                  : balance < 0
                  ? "text-red-500"
                  : "text-black"
              }
            >
              {balance} {currency}
            </div>
          )) : '-'}
        </div>
      </div>
    </div>
  );
};
