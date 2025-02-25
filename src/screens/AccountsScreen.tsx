import { useStore } from "../services/zustand";
import { CURRENCIES } from "../constants/currencies";

export const AccountsScreen = () => {
  const { accounts } = useStore();

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
    </div>
  );
};
