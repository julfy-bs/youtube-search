export const formatNumber = (number: number): string => {
	return number.toLocaleString().replace(/(\d)(?=(\d\d\d)+(\D|$))/g, '$1 ');
}