import { nestedRoutesType } from "@/config/RouteConfig";
import LogParser from "./LogParser";
import LogParserSvg from "@/assets/log-parser.svg";
import LogParserActiveSvg from "@/assets/log-parser-active.svg";

const LogParserRoutes: nestedRoutesType = {
  path: "/log-parser",
  component: <LogParser />,
  navIcon: { icon: LogParserSvg, activeIcon: LogParserActiveSvg },
  routes: [],
};

export default LogParserRoutes;
