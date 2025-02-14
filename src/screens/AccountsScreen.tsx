import { Plus } from "lucide-react";
import { useStore } from "../services/zustand";
import { NavLink } from "react-router";

export const AccountsScreen = () => {
  const { accounts } = useStore();

  return (
    <div id="transactions-screen-container" className="h-full flex flex-col justify-end">
        <div className="max-h-full overflow-scroll">

            {accounts.map(({ id, name, balance }) => (
                
                <div key={id} className="flex flex-row justify-between py-4 mx-4 text-xl font-extralight">
                    <div className={"text-gray-700"}>{name}</div>
                    <div className={balance >= 0 ? "text-green-500" : "text-red-500"}>{balance}</div>
                </div>
            
            ))}
                        
        </div>
        <NavLink to={"/create/account"}>
            <div className="py-4 mx-4 border-t border-gray-500 flex justify-center">
                <Plus size={28} strokeWidth={1} />
            </div>   
        </NavLink>
    </div>
  );
};
