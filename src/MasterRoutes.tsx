import HomeRoutes from "./scene/Home/HomeRoutes";
import LogParserRoutes from "./scene/LogParser/LogParserRoutes";

const MasterRoutes = [
    HomeRoutes,
    LogParserRoutes
];

// eslint-disable-next-line react-refresh/only-export-components
export const userRestrictRoutes: string[] = [];

export default MasterRoutes;