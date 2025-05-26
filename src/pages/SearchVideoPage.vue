<script
	lang='ts'
	setup
>
import { useVideosStore } from '@/app/store';
import LoaderComponent from '@/shared/ui/loader/LoaderComponent.vue';
import VideoList from '@/widgets/video-list/VideoList.vue';
import { onMounted, ref } from 'vue';

const store = useVideosStore();
const observeRef = ref<Element | null>(null);

onMounted(() => {
	if (store.videos.length === 0) {
		store.getVideosWithQueryString();
	}
	const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
		if (entries[0].isIntersecting && store.videos.length >= 10) {
			store.loadMoreVideos();
			console.log('ZAPROS');
		}
	}, {
		rootMargin: '0px',
		threshold: 1.0,
	});
	if (observeRef.value) {
		observer.observe(observeRef.value);
	}
});
</script>

<template>
	<VideoList
		:videos='store.sortedVideos'
	/>
	<LoaderComponent
		v-if='store.isLoading '
		class='video_loader'
	/>
	<div
		ref='observeRef'
		class='video_observer'
	></div>
</template>

<style scoped>
.video_observer {
	background-color: transparent;
	height: 30px;
	width: 100%;
}

.video_loader {
	margin: 40px 0 10px;
}
</style>