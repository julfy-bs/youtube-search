<template>
	<select
		:class='styles.select'
		name='filtration'
		@change='(e) => store.selectOption(e.target?.value!)'
	>
		<option
			disabled
			value=''
		>Выберите из списка
		</option>
		<option
			v-for='option in options'
			:key='option.value'
			:value='option.value'
		>{{ option.name }}
		</option>
	</select>
</template>

<script
	lang='ts'
	setup
>
import { useVideosStore } from '@/app/store';
import { selectOptionsConfig as options } from '@/shared/lib/config/select.ts';
import styles from './SelectComponent.module.css';

const store = useVideosStore();

</script>