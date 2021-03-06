export const getBoundingRectangle = (
	point1: [number, number],
	point2: [number, number]
) => {
	const start_x = Math.min(point1[1], point2[1]);
	const end_x = Math.max(point1[1], point2[1]);

	const start_y = Math.min(point1[0], point2[0]);
	const end_y = Math.max(point1[0], point2[0]);

	return [
		[start_y, start_x],
		[end_y, end_x],
	];
};

type IPoint = {
	x: number;
	y: number;
};

export const isPointInBounds = (
	point: IPoint,
	boundStart: [number, number],
	boundEnd: [number, number]
): boolean => {
	if (
		boundStart[0] <= point.x &&
		point.x < boundEnd[0] &&
		boundStart[1] <= point.y &&
		point.y < boundEnd[1]
	) {
		return true;
	} else {
		return false;
	}
};
