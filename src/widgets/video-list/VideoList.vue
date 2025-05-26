<template>
		<TransitionGroup
			:class='styles.video_list'
			name='video-list'
			tag='ul'
		>
			<li
				v-for='video in videos'
				:key='video.id + id'
			>
					<CardComponent :video='video' />
			</li>
		</TransitionGroup>
</template>

<script
	lang='ts'
	setup
>
import type { Video } from '@/shared/lib/types/Video.types.ts';
import CardComponent from '@/shared/ui/card/CardComponent.vue';
import { useId } from 'vue';
import styles from './VideoList.module.css';

const id = useId();
defineProps<{
	videos: Video[];
}>();
</script>