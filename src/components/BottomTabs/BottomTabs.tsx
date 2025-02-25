import { List, WalletMinimal, Settings2, Plus } from "lucide-react";
import { NavLink } from "react-router";

export const BottomTabs = () => {
  return (
    <div id="bottom-tabs" className="border-t-1 border-gray-400">
      <NavLink
        to="settings"
        key="settings"
        className={({ isActive }) =>
          isActive
            ? "p-4 flex grow justify-center text-black dark:text-white"
            : "p-4 flex grow justify-center text-gray-500"
        }
      >
        <Settings2 size={28} strokeWidth={1} />
      </NavLink>

      <NavLink
        to="accounts"
        key="accounts"
        className={({ isActive }) =>
          isActive
            ? "p-4 flex grow justify-center text-black dark:text-white"
            : "p-4 flex grow justify-center text-gray-500"
        }
      >
        <WalletMinimal size={28} strokeWidth={1} />
      </NavLink>
      <NavLink
        to="transactions"
        key={"transactions"}
        className={({ isActive }) =>
          isActive
            ? "p-4 flex grow justify-center text-black dark:text-white"
            : "p-4 flex grow justify-center text-gray-500"
        }
      >
        <List size={28} strokeWidth={1} />
      </NavLink>
      <NavLink
        to="/create/transaction"
        key={"transactions"}
        className={({ isActive }) =>
          isActive
            ? "p-4 flex grow justify-center text-black dark:text-white"
            : "p-4 flex grow justify-center text-gray-500"
        }
      >
        <Plus size={28} strokeWidth={1} />
      </NavLink>
    </div>
  );
};
