import { useStore } from "../services/zustand";

export const AccountsScreen = () => {
  const { accounts } = useStore();

  return (
    <div
      id="transactions-screen-container"
      className="h-full flex flex-col justify-end"
    >
      <div className="max-h-full overflow-scroll">
        {Object.values(accounts).map(({ id, name, balance, currency }) => (
          <div
            key={id}
            className="flex flex-row justify-between py-3 mx-4 text-xl font-extralight"
          >
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

      <div className="mb-4 mx-4 border-t border-gray-500 flex justify-center"></div>
    </div>
  );
};
