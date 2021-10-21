import { Command } from "renderer/stores/CommandStore";
import Paper from "paper";
import store from "renderer/stores/RootStore";

export default class InsertCommand implements Command {
	private size: paper.Size;
	private position: paper.Point;
	private positionInGrid: IPoint;
	private path: paper.Path;
	private id: string;

	constructor(
		id: string,
		pathData: string,
		cellSize: ISize,
		positionInPixels: IPoint,
		positionInGrid: IPoint
	) {
		this.id = id;
		this.positionInGrid = positionInGrid;
		this.size = new Paper.Size(cellSize.width, cellSize.height);
		this.position = new Paper.Point(positionInPixels.x, positionInPixels.y);
		this.path = new Paper.Path(pathData);
	}

	private insert() {
		return new store.openProjects[store.currentProjectId].canvas.paper.Path({
			segments: this.path.segments,
			bounds: new Paper.Rectangle(this.position, this.size),
			fillColor: new Paper.Color("black"),
			data: {
				point: this.positionInGrid,
				id: this.id,
			},
		});
	}

	execute() {
		this.insert();
		return {
			undo: () =>
				store.openProjects[store.currentProjectId].canvas
					.itemFromId(this.id)
					.remove(),
			redo: () => this.insert(),
		};
	}
}
