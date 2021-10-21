import { makeAutoObservable, when } from "mobx";
import CanvasStore from "./CanvasStore";
import { isPointInBounds } from "../utilities/geometry";
import CommandStore from "./CommandStore";

class ProjectStore {
	cursorPosition: IPoint;
	fileName: string;
	fonts: {}; // TODO
	palette: {}; // TODO
	commands: CommandStore | null;
	id: string;
	cellSize: ISize;
	canvasSize: ISize;
	canvasRef: any;
	refCreated: boolean;
	canvas: any;
	glyphRotation: number;

	constructor(id: string) {
		makeAutoObservable(this);
		console.log("Created a new project with id" + id);

		// Project contents
		this.fonts = {};
		this.palette = {};
		this.commands = null;
		this.canvas = null;

		// Project metadata
		this.fileName = "Untitled";
		this.id = id;
		this.refCreated = false;

		// Canvas settings
		this.cursorPosition = { x: 0, y: 0 };
		this.cellSize = { width: 20, height: 20 };
		this.canvasSize = { width: 20, height: 15 };

		// Current Transform Functions when placing down a glyph
		this.glyphRotation = 0;

		when(
			() => this.refCreated,
			() => this.init(id)
		);
	}

	init(id) {
		this.canvas = new CanvasStore(this, id);
		this.commands = new CommandStore();
	}

	createRef(ref) {
		this.canvasRef = ref;
		this.refCreated = true;
	}

	doTimelapse() {
		this.canvas.paper.project.clear();
		const commands = this.commands?.commands;
		if (commands) {
			let interval = 100;
			commands.forEach((command, index) => {
				setTimeout(() => {
					command.redo();
				}, index * interval);
			});
		}
	}

	get positionInPixels(): IPoint {
		return {
			x: this.cursorPosition.x * this.cellSize.width,
			y: this.cursorPosition.y * this.cellSize.height,
		};
	}

	get canvasSizeInPixels(): ISize {
		return {
			width: this.cellSize.width * this.canvasSize.width,
			height: this.cellSize.height * this.canvasSize.height,
		};
	}

	setPosition(position: IPoint) {
		if (
			isPointInBounds(
				position,
				[0, 0],
				[this.canvasSize.width, this.canvasSize.height]
			)
		) {
			this.cursorPosition = position;
		}
	}
}

export default ProjectStore;
