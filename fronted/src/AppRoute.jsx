import { useRoutes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import Logout from "./components/Logout";
import Admin from "./components/Admin";
import Emp from "./components/Emp";


function AppRoute() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
        path: "/welcome",
        element: <Welcome />
    },
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: "/emp",
      element: <Emp />
    }

  ]);
  return routes;
}

export default AppRoute