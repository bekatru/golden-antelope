import { Plus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { DynamicIcon } from "lucide-react/dynamic";
import { NavLink } from "react-router";

export const SettingsScreen = () => {
  const auth = useAuth();

  function handleLogoutPress() {
    const confirmation = confirm("log out?");
    if (confirmation) {
      auth.logout();
    }
  }

  return (
    <div id="settings-screen" className="h-full px-4 flex flex-col justify-end">
      <div>
        <NavLink to="/create/account">
          <div className="flex justify-between items-center py-3">
            <div className="font-light text-xl">account</div>
            <Plus size={28} strokeWidth={1} />
          </div>
        </NavLink>
        <NavLink to="/create/category">
          <div className="flex justify-between items-center py-3">
            <div className="font-light text-xl">category</div>
            <Plus size={28} strokeWidth={1} />
          </div>
        </NavLink>
      </div>

      <div
        id="settings-screen-header"
        className="flex justify-between items-center border-t py-3"
        onClick={auth.user ? handleLogoutPress : auth.login}
      >
        <div className="font-light text-xl">
          {auth.user?.email ?? "log in"}
        </div>
        <DynamicIcon
          name={auth.user ? "log-out" : "log-in"}
          size={28}
          strokeWidth={1}
        />
      </div>
    </div>
  );
};
