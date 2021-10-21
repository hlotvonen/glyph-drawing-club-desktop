import store from "renderer/stores/RootStore";

enum ERotate {
	Clockwise = 1,
	Counterclockwise = 0,
}

export default class RotateCommand {
	private degrees: number;
	private id: string;

	constructor(degrees: number, id: string) {
		this.degrees = degrees;
		this.id = id;
	}

	private rotate(rotate: ERotate) {
		store.openProjects[store.currentProjectId].canvas
			.itemFromId(this.id)
			.rotate(rotate ? this.degrees : -this.degrees);
	}

	public execute() {
		this.rotate(ERotate.Clockwise);
		return {
			undo: () => this.rotate(ERotate.Counterclockwise),
			redo: () => this.rotate(ERotate.Clockwise),
		};
	}
}
