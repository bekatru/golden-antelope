import { Outlet } from "react-router";
import { BottomTabs } from "./BottomTabs";

export const BottomTabsLayout = () => {
  return (
    <div id="bottom-tabs-layout" className="h-full pb-[60px]">
      <Outlet/>
      <BottomTabs/>
    </div>
  );
};
