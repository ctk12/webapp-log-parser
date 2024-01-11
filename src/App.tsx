import Layout from "./components/Layout";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import routeConfig from "./config/RouteConfig";
import { userRestrictRoutes } from "./MasterRoutes";
import { useEffect } from "react";

function App() {
  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    } else {
      navigate(location.pathname);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
     <Layout>
        <Routes>
          {routeConfig.filter(data => {
            if (userRestrictRoutes.includes(data.path)) {
              return false;
            }
            return true;
          }).map(route => (
            <Route key={route.path} index={route.path === "/"} path={route.path} element={route.component} />
          ))}
        </Routes>
      </Layout>
    </>
  )
}

export default App;
