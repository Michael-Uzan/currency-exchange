import { Rates } from "../pages/Rates";

interface IRoutes {
    path: string,
    component: any
}

const routes: IRoutes[] = [
    {
        path: '/rates',
        component: Rates,
    }
]

export default routes;
