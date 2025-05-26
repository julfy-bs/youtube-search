<template>
	<div>
		<iframe
			:src='videoEmbedded'
			frameborder='0'
			height='360'
			width='100%'
		/>
		<h1>{{ store.currentVideo?.title }}</h1>
		<h1>{{ store.currentVideo?.channelTitle }}</h1>
		<p>{{ store.currentVideo?.views }}</p>
	</div>
</template>

<script
	lang='ts'
	setup
>
import { useVideosStore } from '@/app/store';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const videoEmbedded = ref(`https://www.youtube.com/embed/${ route.params.videoId }`);
const store = useVideosStore();
</script>