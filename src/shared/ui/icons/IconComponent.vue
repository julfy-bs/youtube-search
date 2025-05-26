<template>
	<svg
		:class='styles.container'
		:height='size'
		:width='size'
	>
		<use
			:xlink:href='`${iconsUrl}#${iconName}`'
		></use>
	</svg>
</template>

<script
	lang='ts'
	setup
>
import styles from './IconComponent.module.css';
import iconsUrl from './icons.svg';

defineProps({
	size: {
		type: Number,
		default: 18
	},
	iconName: {
		type: String,
		required: true,
	}
});
</script>