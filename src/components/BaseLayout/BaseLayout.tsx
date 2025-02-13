import { Outlet } from "react-router";
import { BaseLayoutTabs } from "./BaseLayoutTabs";

export const BaseLayout = () => {
  return (
    <div id="bottom-tabs-layout" className="h-full pb-[60px]">
      <Outlet/>
      <BaseLayoutTabs/>
    </div>
  );
};
