<template>
	<article :class='styles.card'>
		<button
			:class='styles.card_save_button'
			@click.stop='() => handleSaveVideoBtn(video)'
		>
			<IconComponent
				v-if='isSaved'
				:class='styles.card_save'
				icon-name='check'
			/>
			<IconComponent
				v-else
				:class='styles.card_save'
				icon-name='promo'
			/>
		</button>
		<RouterLink
			:class='styles.card_link'
			:to='{ name: "detail", params: { videoId: video.id } }'
			@click.stop='store.selectCurrentVideo(video)'
		>
			<img
				:class='styles.card_image'
				:src='video.image'
				alt=''
			>
			<div :class='styles.card_content'>
				<h2 :class='styles.card_title'>{{ video.title }}</h2>
				<h3 :class='styles.card_channel'>
					<IconComponent icon-name='account' />
					{{ video.channelTitle }}
				</h3>
				<p :class='styles.card_date'>
					{{ new Date(video.publishedAt).toLocaleDateString() }} {{ new Date(
					video.publishedAt).toLocaleTimeString() }}
				</p>
				<p :class='styles.card_views'>
					{{ formattedViews }}
					<IconComponent icon-name='eye' />
				</p>
			</div>
		</RouterLink>
	</article>
</template>

<script
	lang='ts'
	setup
>
import { useVideosStore } from '@/app/store';
import { formatNumber } from '@/shared/lib/helpers/formatNumber.ts';
import type { Video } from '@/shared/lib/types/Video.types.ts';
import IconComponent from '@/shared/ui/icons/IconComponent.vue';
import { computed } from 'vue';
import styles from './CardComponent.module.css';

const props = defineProps<{
	video: Video
}>();

const store = useVideosStore();
const formattedViews = computed(() => formatNumber(props.video.views!));
const isSaved = computed(() => store.favouriteVideos.some((favourite) => favourite.id === props.video.id));

const handleSaveVideoBtn = (video: Video) => {
	if (isSaved.value) {
		console.log('remove', isSaved.value);
		store.removeFavouriteVideo(video);
	} else {
		console.log('save', isSaved.value);
		store.saveFavouriteVideo(video);
	}
};
</script>
