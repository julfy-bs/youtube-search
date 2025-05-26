export type VideosDataProps = VideosSnippetByQueryProps;

export type VideosSnippetByQueryProps = {
	searchedValue: string;
	maxResults?: number;
	relevanceLanguage?: string;
	nextPageToken?: string | null;
}

export type VideosStatisticByQueryProps = {
	ids: string[];
} & Omit<VideosSnippetByQueryProps, 'searchedValue'>;

export type YouTubeSearchedVideo = {
	kind: string;
	etag: string;
	id: {
		kind: string;
		videoId: string;
	},
}

export type VideoThumbnail = {
	url: string;
	width: number;
	height: number;
}

export type VideoStatistics = {
	statistics: {
		viewCount: string;
		likeCount: string;
		favoriteCount: string;
		commentCount: string;
	}
}

export type YouTubeSearchedVideoSnippet = {
	snippet: {
		publishedAt: string;
		channelId: string;
		title: string;
		description: string;
		thumbnails: {
			default?: VideoThumbnail;
			medium?: VideoThumbnail;
			high?: VideoThumbnail;
		},
		channelTitle: string;
		liveBroadcastContent: string;
		publishTime: string;
	}
}

export type YouTubeSearchSnippetResponse = {
	kind: string;
	etag: string;
	nextPageToken: string;
	regionCode: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	},
	items: (YouTubeSearchedVideo & YouTubeSearchedVideoSnippet)[];
}

export type YouTubeSearchStatisticsResponse = {
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	}
	kind: string;
	etag: string;
	items: (Omit<YouTubeSearchedVideo, 'id'> & {id: string} & VideoStatistics)[];
}