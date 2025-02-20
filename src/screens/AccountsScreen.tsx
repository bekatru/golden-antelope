import { useMemo } from "react";
import { useStore } from "../services/zustand";
import { CURRENCIES } from "../constants/currencies";
import Big from "big.js";

export const AccountsScreen = () => {
  const { accounts } = useStore();

  const totals: [string, number][] = useMemo(() => {
    const totalsMap = Object.values(accounts).reduce((result, account) => {
      if (result[account.currency]) {
        const accumulatorValueDecimal = new Big(result[account.currency]);
        result[account.currency] = accumulatorValueDecimal.plus(new Big(account.balance)).toNumber();
      } else {
        result[account.currency] = new Big(account.balance).toNumber();
      }
      return result;
    }, {} as Record<string, number>);

    return Object.entries(totalsMap);
  }, [accounts]);

  return (
    <div
      id="transactions-screen-container"
      className="h-full px-4 flex flex-col justify-end text-xl font-light"
    >
      <div className="max-h-full overflow-scroll">
        {Object.values(accounts).map(({ id, name, balance, currency }) => (
          <div key={id} className="flex justify-between py-3">
            <div>{name}</div>
            <div
              className={
                balance > 0
                  ? "text-green-500"
                  : balance < 0
                  ? "text-red-500"
                  : ""
              }
            >
              {balance}
              {CURRENCIES[currency].symbol}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t flex justify-between py-3">
        <div>totals</div>
        <div className="flex space-x-4">
          {totals.length ? totals.map(([currency, balance]) => (
            <div
              className={
                balance > 0
                  ? "text-green-500"
                  : balance < 0
                  ? "text-red-500"
                  : ""
              }
            >
              {balance}
              {CURRENCIES[currency].symbol}
            </div>
          )) : '-'}
        </div>
      </div>
    </div>
  );
};
