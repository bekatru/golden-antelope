import { Plus, List, WalletMinimal, Settings2 } from "lucide-react";
import { NavLink } from "react-router";

export const BottomTabs = () => {
  return (
    <div id="bottom-tabs">
      <NavLink to="settings" className={({isActive}) => ["bottom-tab", isActive && "active"].join(' ')}>
        <Settings2 size={28} strokeWidth={1} />
      </NavLink>
      <NavLink to="accounts" className={({isActive}) => ["bottom-tab", isActive && "active"].join(' ')}>
        <WalletMinimal size={28} strokeWidth={1} />
      </NavLink>
      <NavLink to="transactions" className={({isActive}) => ["bottom-tab", isActive && "active"].join(' ')}>
        <List size={28} strokeWidth={1} />
      </NavLink>
      <NavLink to="add" className={({isActive}) => ["bottom-tab", isActive && "active"].join(' ')}>
        <Plus size={28} strokeWidth={1} />
      </NavLink>
    </div>
  );
};
