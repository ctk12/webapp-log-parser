import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import routeConfig from "./config/RouteConfig";
import { userRestrictRoutes } from "./MasterRoutes";

function App() {

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
