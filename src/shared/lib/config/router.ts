import type { RouteTypes } from '@/shared/lib/types/Route.types.ts';

export const BASE_URL = import.meta.env.MODE === 'production'
	? '/youtube-search/'
	: '/';

export const ROUTER_PATHS = {
	HOME: BASE_URL,
	FAVOURITE: `${ BASE_URL }favourite`,
};

export const routerConfig: RouteTypes[] = [
	{
		path: ROUTER_PATHS.HOME,
		title: 'Поиск видео',
	},
	{
		path: ROUTER_PATHS.FAVOURITE,
		title: 'Избранные видео',
	},
];