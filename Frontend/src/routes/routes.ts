import { Dashboard } from "../pages/Dashboard";
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
    }
]

export default routes;
