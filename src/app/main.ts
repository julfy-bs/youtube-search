import { router } from '@/app/router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

const pinia = createPinia();

const app = createApp(App);

app
	.use(router)
	.use(pinia)
	.mount('#app');
