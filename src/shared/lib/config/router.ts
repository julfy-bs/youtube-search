import type { RouteTypes } from '@/shared/lib/types/Route.types.ts';

export const routerConfig: RouteTypes[] = [
	{
		path: '/',
		title: 'Поиск видео',
	},
	{
		path: '/favourite',
		title: 'Избранные видео',
	},
]