import Home from "../screens/Home/Home";
import Wellcome from "../screens/Login/Wellcome";
import Forgot from "../screens/ChangePassWord/ChangePassword";
import Login from "../screens/Login/Login";
import Map from "../screens/Home/Map/Map";
import Dashboard from "../screens/Dashboard";
import LoginFirst from "../screens/LoginFirst/LoginFirst";

export const screen = [
    {
        name: "Home",
        component: Home,
        layout: true
    },
    {
        name: "Map",
        component: Map,
        layout: true
    },
    {
        name: "Wellcom",
        component: Wellcome,
        layout: false
    },
    {
        name: "Login",
        component: Login,
        layout: false
    },
    {
        name: "Forgot",
        component: Forgot,
        layout: false
    },
    {
        name: "Dashboard",
        component: Dashboard,
        layout: true
    },
    {
        name: "LoginFirst",
        component: LoginFirst,
        layout: false
    },
]