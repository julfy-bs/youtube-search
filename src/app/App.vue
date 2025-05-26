<script
	lang='ts'
	setup
>
import { useVideosStore } from '@/app/store';
import ErrorComponent from '@/shared/ui/error/ErrorComponent.vue';
import SelectComponent from '@/shared/ui/select/SelectComponent.vue';
import NavigationComponent from '@/widgets/navigation/NavigationComponent.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const videosStore = useVideosStore();
const route = useRoute();

onMounted(() => videosStore.loadFavouriteVideosFromLS());
</script>

<template>
	<NavigationComponent />
	<main class='main'>
		<h1 class='main_title'>Поиск видео на Youtube</h1>
		<form class='select'>
			<SelectComponent />
		</form>
		<section class='section'>
			<RouterView v-if='!videosStore.isGetError' />
			<ErrorComponent
				v-else-if='videosStore.isGetError && videosStore.error'
				:code='videosStore.error.code'
				:message='videosStore.error.message'
				:reason='videosStore.error.errors[0].reason'
				class='error_article'
			/>
			<ErrorComponent
				v-else-if='!route.path.includes(`/favourite`) && videosStore.videos.length === 0'
				:code='404'
				message='Видео не найдены. Попробуйте ввести другой поисковый запрос.'
				reason='custom-error'
			/>
			<ErrorComponent
				v-else-if='route.path.includes(`/favourite`) && videosStore.favouriteVideos.length === 0'
				:code='404'
				message='Избранные видео не найдены. Попробуйте сначала добавить видео в избранное, затем перейти на эту
					страницу.'
				reason='custom-error'
			/>
		</section>
	</main>
</template>

<style scoped>
.main {
	display: grid;
	gap: 32px;
	grid-auto-columns: 1fr 1fr;
	grid-template-areas: "title filtration"
	"grid grid";
	grid-template-rows: minmax(50px, 1fr) auto;
	justify-content: space-between;
	width: 100%;
}

.select {
	grid-area: filtration;
	margin-left: auto;
	max-width: 400px;
	width: 100%;
}

.section {
	align-items: center;
	background-color: #101015;
	border-radius: 32px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 8px;
	grid-area: grid;
	justify-content: flex-start;
	min-height: calc(100vh - 100px);
	padding: 20px 14px 0;
	width: 100%;
}

.main_title {
	color: #fff;
	font-size: 32px;
	font-weight: 700;
	grid-area: title;
	line-height: 137%;
	margin: 0;
	padding: 0 16px;
	text-align: start;
}


@media screen and (max-width: 920px) {
	.main {
		grid-template-areas: "title"
		"filtration"
		"grid";
		place-items: center;
	}
	
	.select {
		margin: 0;
		max-width: none;
	}
	
	.main_title {
		text-align: center;
	}
}
</style>