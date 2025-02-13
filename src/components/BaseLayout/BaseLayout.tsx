import { Outlet } from "react-router";

export const BaseLayout = () => {
  return (
    <div id="bottom-tabs-layout" className="h-full">
      <Outlet/>
    </div>
  );
};
