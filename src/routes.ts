import {
    type RouteConfig,
    index,
    layout,
    route,
} from '@react-router/dev/routes';

export default [
    layout('./layouts/rootLayout.tsx', [
        index('./pages/home.tsx'),

        layout('./layouts/protectedRoutesLayout.tsx', [
            route('profile', './pages/profile.tsx'),
        ]),
    ]),
] satisfies RouteConfig;
