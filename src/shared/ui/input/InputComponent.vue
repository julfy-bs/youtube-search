<template>
	<input
		:class='styles.input'
		:value='modelValue'
		:placeholder='placeholder'
		type='text'
		@input='update'
	/>
</template>

<script
	lang='ts'
	setup
>
import styles from './InputComponent.module.css';

defineProps({
	name: {
		type: String,
		required: false,
	},
	placeholder: {
		type: String,
		required: false,
	}
});

const model = defineModel();

function update(event: Event) {
	model.value = (event.target as HTMLInputElement).value;
}
</script>
