<template>
	<article :class='styles.error_article'>
		<p :class='styles.error_server'>
			<span :class='styles.error_code'>{{ code }}</span>
			<span :class='styles.error_status'>{{ reason }}</span>
		</p>
		<p :class='styles.error_message'>{{ message }}</p>
	</article>
</template>

<script
	setup
	lang='ts'
>
import styles from './ErrorComponent.module.css';

defineProps<{
	code?: number;
	reason: string;
	message: string;
}>();
</script>