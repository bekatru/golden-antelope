import { Home } from "lucide-react";
import { NavLink } from "react-router";

export const BaseLayoutTabs = () => {
  return (
    <div id="base-layout-tabs" className="flex flex-row justify-evenly fixed bottom-0 right-0 left-0">
      <NavLink
        to="/"
        className={({ isActive }) =>
          ["bottom-tab", isActive && "active"].join(" ")
        }
      >
        <Home size={28} strokeWidth={1} />
      </NavLink>
    </div>
  );
};
