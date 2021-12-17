import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { Rates } from "../pages/Rates";

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
        path: '/',
        component: Home,
    }
]

export default routes;
