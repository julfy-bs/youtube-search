import { createVideoObject } from '@/shared/lib/helpers/createVideoObject.ts';
import type {
	VideosDataProps,
	VideosSnippetByQueryProps,
	VideosStatisticByQueryProps,
	YouTubeSearchSnippetResponse,
	YouTubeSearchStatisticsResponse,
} from '@/shared/lib/types/Api.types.ts';
import type { Video } from '@/shared/lib/types/Video.types.ts';

export class YouTubeApi {
	url: string;
	key: string;
	
	constructor() {
		this.url = import.meta.env.VITE_YT_API_URL;
		this.key = import.meta.env.VITE_YT_API_KEY;
		// this.key = 'cheat';
	}
	
	async getVideosData({
		searchedValue,
		maxResults,
		relevanceLanguage,
		nextPageToken,
	}: VideosDataProps): Promise<{ nextPageToken: string; videos: Video[] }> {
		let ids: string[] = [];
		const videos: Video[] = [];
		const snippetResponse = await this.getVideosSnippetByQuery({
			searchedValue,
			maxResults,
			relevanceLanguage,
			nextPageToken,
		});
		
		if (snippetResponse && snippetResponse.items.length > 0) {
			snippetResponse.items.forEach((video) => {
				videos.push(createVideoObject(video));
				ids.push(video.id.videoId);
			});
		}
		
		const statisticsResponse = await YouTubeAPI.getVideosStatisticsByQuery({
			ids,
			maxResults,
			relevanceLanguage,
		});
		
		videos.forEach((video, index) => {
			if (video.id === statisticsResponse.items[index].id) {
				Object.assign(video, {
					views: statisticsResponse.items[index].statistics.viewCount,
				});
			}
		});
		
		return {
			nextPageToken: snippetResponse.nextPageToken,
			videos,
		};
	}
	
	private getVideosSnippetByQuery({
		searchedValue,
		maxResults = 24,
		relevanceLanguage = 'ru',
		nextPageToken = null,
	}: VideosSnippetByQueryProps): Promise<YouTubeSearchSnippetResponse> {
		const url = this.url +
			'search' +
			`?key=${ this.key }` +
			`&maxResults=${ maxResults }` +
			`&relevanceLanguage=${ relevanceLanguage }` +
			'&type=video' +
			`&q=${ searchedValue }` +
			'&part=snippet';
		if (nextPageToken) {
			return fetch(url + `&pageToken=${ nextPageToken }`)
				.then(this.checkResponse) as Promise<YouTubeSearchSnippetResponse>;
		} else {
			return fetch(url)
				.then(this.checkResponse) as Promise<YouTubeSearchSnippetResponse>;
		}
	}
	
	private getVideosStatisticsByQuery({
		ids,
		maxResults = 24,
		relevanceLanguage = 'ru',
	}: VideosStatisticByQueryProps): Promise<YouTubeSearchStatisticsResponse> {
		const idsString = ids.join(',');
		const url = this.url +
			'videos' +
			`?key=${ this.key }` +
			`&maxResults=${ maxResults }` +
			`&relevanceLanguage=${ relevanceLanguage }` +
			`&type=video` +
			`&part=statistics` +
			`&id=${ idsString }`;
		return fetch(url)
			.then(this.checkResponse) as Promise<YouTubeSearchStatisticsResponse>;
	}
	
	private checkResponse<T>(res: Response): Promise<T> {
		return res.ok ? res.json() as Promise<T> : res.json()
			.then((err) => {
				return Promise.reject(err);
			});
	};
}

export const YouTubeAPI = new YouTubeApi();