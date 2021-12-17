import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Rates } from "../pages/Rates";
import { Signup } from "../pages/Signup";

interface IRoutes {
    path: string,
    component: any
}

const routes: IRoutes[] = [
    {
        path: '/dashboard',
        component: Dashboard,
    },
    {
        path: '/rates',
        component: Rates,
    },
    {
        path: '/signup',
        component: Signup,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/',
        component: Home,
    }
]

export default routes;
