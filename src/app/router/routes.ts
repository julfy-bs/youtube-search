import DetailVideoPage from '@/pages/DetailVideoPage.vue';
import FavouriteVideosPage from '@/pages/FavouriteVideosPage.vue';
import SearchVideoPage from '@/pages/SearchVideoPage.vue';

export const routes = [
	{ path: '/', component: SearchVideoPage },
	{ path: '/:videoId', name: 'detail', component: DetailVideoPage },
	{ path: '/favourite', component: FavouriteVideosPage },
]