export type CustomError = {
	code: number,
	errors: {
		message: string;
		domain: string;
		reason: string;
	}[];
	message: string;
	status: string;
}

export type YTError = {
	error: CustomError;
}