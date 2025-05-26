import { YouTubeAPI } from '@/shared/api/videoApi.ts';
import type { CustomError, YTError } from '@/shared/lib/types/Errors.types.ts';
import type { SortingValues } from '@/shared/lib/types/SortingValues.ts';
import type { Video } from '@/shared/lib/types/Video.types.ts';
import { defineStore } from 'pinia';

type VideosStore = {
	isLoading: boolean;
	searchedValue: string;
	videos: Video[];
	selectedSort: 'title' | 'channelTitle' | 'publishedAt';
	favouriteVideos: Video[];
	currentVideo: Video | null;
	error: CustomError | null;
	isGetError: boolean;
	nextPageToken: string | null;
}

export const useVideosStore = defineStore('videos', {
	state: (): VideosStore => ({
		isLoading: false,
		searchedValue: '',
		videos: [],
		selectedSort: 'publishedAt',
		favouriteVideos: [],
		currentVideo: null,
		error: null,
		isGetError: false,
		nextPageToken: null,
	}),
	getters: {
		sortedVideos: (state) => [...state.videos].sort(
			(video1, video2) => video1[state.selectedSort]?.localeCompare(video2[state.selectedSort])),
	},
	actions: {
		selectOption(option: SortingValues) {
			this.selectedSort = option;
		},
		selectCurrentVideo(video: Video) {
			this.currentVideo = video;
		},
		async getVideosWithQueryString() {
			if (!this.isLoading) {
				try {
					this.isLoading = true;
					const response = await YouTubeAPI.getVideosData({
						searchedValue: this.searchedValue,
					});
					this.videos = response.videos;
					this.nextPageToken = response.nextPageToken;
				} catch (e: unknown) {
					this.isGetError = true;
					this.error = {
						code: ((e as YTError).error as CustomError).code,
						errors: ((e as YTError).error as CustomError).errors,
						message: ((e as YTError).error as CustomError).message,
						status: ((e as YTError).error as CustomError).status,
					};
				} finally {
					this.isLoading = false;
				}
			}
		},
		async loadMoreVideos() {
			if (!this.isLoading) {
				try {
					this.isLoading = true;
					const response = await YouTubeAPI.getVideosData({
						searchedValue: this.searchedValue,
						nextPageToken: this.nextPageToken,
					});
					this.nextPageToken = response.nextPageToken;
					this.videos = [...this.videos, ...response.videos];
				} catch (e: unknown) {
					this.isGetError = true;
					this.error = {
						code: ((e as YTError).error as CustomError).code,
						errors: ((e as YTError).error as CustomError).errors,
						message: ((e as YTError).error as CustomError).message,
						status: ((e as YTError).error as CustomError).status,
					};
				} finally {
					this.isLoading = false;
				}
			}
		},
		loadFavouriteVideosFromLS() {
			this.favouriteVideos = JSON.parse(localStorage.getItem('video') ?? '');
		},
		async saveFavouriteVideo(video: Video) {
			void this.favouriteVideos.push(video);
			localStorage.setItem('video', JSON.stringify(this.favouriteVideos));
		},
		removeFavouriteVideo(video: Video) {
			this.favouriteVideos = this.favouriteVideos.filter((favourite) => favourite.id !== video.id);
			localStorage.setItem('video', JSON.stringify(this.favouriteVideos));
		},
	},
});