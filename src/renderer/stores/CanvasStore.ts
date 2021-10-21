import { makeAutoObservable } from "mobx";
import Paper from "paper";

class CanvasStore {
	paper: any;
	id: string;
	project: any;

	constructor(project, id: string) {
		makeAutoObservable(this);
		this.project = project;
		this.id = id;
		this.setupPaperScope();
	}

	setupPaperScope() {
		const scope = new Paper.PaperScope();
		scope.setup(this.project.canvasRef);
		this.paper = scope;
	}

	get positionPaperPoint(): paper.Point {
		return new Paper.Point({
			x: this.project.cursorPosition.x * this.project.cellSize.width,
			y: this.project.cursorPosition.y * this.project.cellSize.height,
		});
	}

	get itemAtPoint(): paper.Path {
		return this.paper.project
			.getItems({ data: { point: this.project.cursorPosition } })
			.at(-1);
	}

	get idFromPoint(): string {
		return this.itemAtPoint.data.id;
	}

	itemFromId(id: string): paper.Item {
		return this.paper.project.getItem({ data: { id: id } });
	}
}

export default CanvasStore;
