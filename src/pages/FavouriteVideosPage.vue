<template>
	<VideoList :videos='store.favouriteVideos' :isLoading='store.isLoading' />
</template>

<script
	setup
	lang='ts'
>
import { useVideosStore } from '@/app/store';
import VideoList from '@/widgets/video-list/VideoList.vue';

const store = useVideosStore();
</script>