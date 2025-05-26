import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/youtube-search/' : '/',
	plugins: [vue()],
	resolve: {
		alias: {
			'@/': `${path.resolve(__dirname, 'src')}/`
		}
	},
});
