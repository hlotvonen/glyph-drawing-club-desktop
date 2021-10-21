declare global {
	interface Window {
		electron: any;
	}
	interface ISize {
		width: number;
		height: number;
	}
	interface IPoint {
		x: number;
		y: number;
	}
}

export {};
