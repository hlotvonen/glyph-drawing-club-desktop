export const getBoundingRectangle = (point1: [number, number], point2: [number, number]) => {
	const start_x = Math.min(point1[1], point2[1])
	const end_x = Math.max(point1[1], point2[1])

	const start_y = Math.min(point1[0], point2[0])
	const end_y = Math.max(point1[0], point2[0])

	return [[start_y, start_x], [end_y, end_x]]
}

interface ICoordinates {
	x: number;
	y: number;
}

export const checkIfCoordinateIsInBounds = (
	coordinates: ICoordinates,
	startPoint: [number, number],
	endPoint: [number, number]
): boolean => {
	if (
		(startPoint[0] <= coordinates.x && coordinates.x < endPoint[0])
		&& (startPoint[1] <= coordinates.y && coordinates.y < endPoint[1])
	) {
		return true;
	} else {
		return false;
	}
}
