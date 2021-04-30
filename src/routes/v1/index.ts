import { Router, IRoute } from 'express';
import gridRoute from './grid.route';

const router = Router();

const gridRoutes = [{
    path: '/grid',
    route: gridRoute,
}];

gridRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
