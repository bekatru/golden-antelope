import { Outlet } from "react-router";
import { BottomTabs } from "./BottomTabs";

export const BottomTabsLayout = () => {
  return (
    <div id="bottom-tabs-layout">
      <Outlet/>
      <BottomTabs/>
    </div>
  );
};
