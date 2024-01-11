import "./SideBar.scss";
import analyticsSvg from "../../assets/analytics.svg";
import { MenuItem } from "./MenuItem";
import { useLocation } from "react-router";
import { navRoutes } from "@/config/RouteConfig";
import { userRestrictRoutes } from "@/MasterRoutes";

export const SideBar = () => {
    const location = useLocation();
    
    return (
       <div className="sidebar flex flex-col items-center gap-11">
        <div>
          <img src={analyticsSvg} alt="logo" width={30} height={30} />
        </div>

        <ul className="flex flex-col gap-9 h-full">
            {navRoutes.filter(data => {
            if (userRestrictRoutes.includes(data.path)) {
              return false;
            }
            return true;
          }).map(data => {
                const { path, childPath, icon, activeIcon } = data;
                const isActive = location.pathname === path || childPath.includes(location.pathname);
                return <MenuItem key={path} icon={isActive ? activeIcon : icon} isActive={isActive} path={path} />
            })}
        </ul>
       </div>
    )
}