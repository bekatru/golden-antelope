import { Plus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { DynamicIcon } from "lucide-react/dynamic";
import { NavLink } from "react-router";

export const SettingsScreen = () => {
  const auth = useAuth();
  return (
    <div id="settings-screen" className="h-full flex flex-col">

      <div id="settings-screen-header" className="flex justify-between items-center">
        <p>{auth.user?.name ?? "Log in to use full potential"}</p>
        <DynamicIcon
          name={auth.user ? "log-out" : "log-in"}
          size={28}
          onClick={auth.user ? auth.logout : auth.login}
          strokeWidth={1}
        />
      </div>

      <div className="border-t mt-auto">

        <NavLink to='/create/category'>
          <div className="flex justify-between items-center py-4">
            <div className="font-extralight text-xl">category</div>
            <Plus size={28} strokeWidth={1}/>
          </div>
        </NavLink>

      </div>

    </div>
  );
};
