import { nestedRoutesType } from "@/config/RouteConfig";
import Home from "./Home";
import HomeSvg from "@/assets/home.svg";
import HomeActiveSvg from "@/assets/home-active.svg";

const HomeRoutes: nestedRoutesType = {
  path: "/home",
  component: <Home />,
  navIcon: { icon: HomeSvg, activeIcon: HomeActiveSvg },
  routes: [],
};

export default HomeRoutes;
