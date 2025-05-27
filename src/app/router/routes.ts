import DetailVideoPage from '@/pages/DetailVideoPage.vue';
import FavouriteVideosPage from '@/pages/FavouriteVideosPage.vue';
import SearchVideoPage from '@/pages/SearchVideoPage.vue';

const BASE_URL = process.env.NODE_ENV === 'production'
	? '/youtube-search/'
	: '/';

export const routes = [
	{ path: `${ BASE_URL }`, component: SearchVideoPage },
	{
		path: `${ BASE_URL }:videoId`,
		name: 'detail',
		component: DetailVideoPage,
	},
	{ path: `${ BASE_URL }favourite`, component: FavouriteVideosPage },
];