import DetailVideoPage from '@/pages/DetailVideoPage.vue';
import FavouriteVideosPage from '@/pages/FavouriteVideosPage.vue';
import SearchVideoPage from '@/pages/SearchVideoPage.vue';
import { BASE_URL } from '@/shared/lib/config/router.ts';

export const routes = [
	{ path: `${ BASE_URL }`, component: SearchVideoPage },
	{
		path: `${ BASE_URL }:videoId`,
		name: 'detail',
		component: DetailVideoPage,
	},
	{ path: `${ BASE_URL }favourite`, component: FavouriteVideosPage },
];