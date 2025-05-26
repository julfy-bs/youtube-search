import type { Video } from '@/shared/lib/types/Video.types.ts';

export function createVideoObject(video: any): Video {
	return {
		id: video.id.videoId,
		title: video.snippet.title,
		image: video.snippet.thumbnails.high.url,
		channelTitle: video.snippet.channelTitle,
		publishedAt: video.snippet.publishedAt,
	};
}