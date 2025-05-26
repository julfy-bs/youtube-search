<template>
	<header :class='styles.header'>
		<form
			:class='styles.form'
			@submit.prevent='() => store.getVideosWithQueryString()'
		>
			<InputComponent
				v-model='store.searchedValue'
				:class='styles.form_input'
				name='search'
				placeholder='Введите поисковый запрос'
				@update:modelValue='() => store.getVideosWithQueryString()'
			/>
		</form>
		<RouterLink to='/'>
			<IconComponent
				:size='48'
				class='title_icon'
				icon-name='youtube'
			/>
		</RouterLink>
		<nav :class='styles.navigation'>
			<ul :class='styles.navigation_list'>
				<li v-for='route in routerConfig'>
					<RouterLink
						:active-class='styles.navigation_link_active'
						:class='styles.navigation_link'
						:to='route.path'
					>{{ route.title }}
					</RouterLink>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script
	lang='ts'
	setup
>

import { useVideosStore } from '@/app/store';
import { routerConfig } from '@/shared/lib/config/router.ts';
import IconComponent from '@/shared/ui/icons/IconComponent.vue';
import InputComponent from '@/shared/ui/input/InputComponent.vue';
import styles from './NavigationComponent.module.css';

const store = useVideosStore();
</script>
