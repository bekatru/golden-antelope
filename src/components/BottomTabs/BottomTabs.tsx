import { List, WalletMinimal, Settings2 } from "lucide-react";
import { NavLink } from "react-router";

export const BottomTabs = () => {
  const bottomTabClassNames = "p-4 flex grow justify-center";
  return (
    <div id="bottom-tabs">
      <NavLink
        to="transactions"
        className={({ isActive }) =>
          `${bottomTabClassNames} text-${
            isActive ? "black" : "gray-500"
          } dark:text-${isActive ? "white" : "gray-500"}`
        }
      >
        <List size={28} strokeWidth={1} />
      </NavLink>
      <NavLink
        to="accounts"
        className={({ isActive }) =>
          `${bottomTabClassNames} text-${
            isActive ? "black" : "gray-500"
          } dark:text-${isActive ? "white" : "gray-500"}`
        }
      >
        <WalletMinimal size={28} strokeWidth={1} />
      </NavLink>
      <NavLink
        to="settings"
        className={({ isActive }) =>
          `${bottomTabClassNames} text-${
            isActive ? "black" : "gray-500"
          } dark:text-${isActive ? "white" : "gray-500"}`
        }
      >
        <Settings2 size={28} strokeWidth={1} />
      </NavLink>
    </div>
  );
};
