import store from "renderer/stores/RootStore";

export default class FlipCommand {
	private id: string;

	constructor(id: string) {
		this.id = id;
	}

	private flip() {

		const flipValue = store.openProjects[store.currentProjectId].canvas
			.itemFromId(this.id)
			.scaling;

		store.openProjects[store.currentProjectId].canvas
			.itemFromId(this.id)
			.scale(flipValue.x * -1, 1);

	}

	public execute() {
		this.flip();
		return {
			undo: () => this.flip(),
			redo: () => this.flip(),
		};
	}
}
