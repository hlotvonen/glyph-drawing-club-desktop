import { makeAutoObservable } from "mobx"
import Paper from "paper";
import { checkIfCoordinateIsInBounds } from "../utilities/geometry"

interface ISize {
	width: number;
	height: number;
}

interface IPoint {
	x: number;
	y: number;
}

class PaperStore {
	paths: string[];
	cellSize: ISize;
	canvasSize: ISize;
	position: IPoint;


	constructor() {
		makeAutoObservable(this)
		this.paths = [
			"M800 0L800 800L0 800L0 0Z",
			"M800 0L800 800L0 0Z",
			"M800 0C800 450 450 800 0 800L0 0Z",
			"M400 0C621 0 800 179 800 400C800 621 621 800 400 800C179 800 0 621 0 400C0 179 179 0 400 0Z",
			"M800 0L800 200L0 200L0 0Z",
			"M800 0L0 800C600 200 600 0 0 0Z",
			"M800 0L400 800L0 0Z",
			"M0 200L0 0L200 0L800 600L800 800L600 800Z",
			"M800 0L800 200L600 0Z",
			"M400 0C100 0 0 200 0 800L0 0ZM800 0L800 800C800 200 700 0 400 0Z"
		]
		this.cellSize = {
			width: 40,
			height: 40
		}
		this.canvasSize = {
			width: 15,
			height: 10
		}
		this.position = {
			x: 0,
			y: 0
		}
	}

	get positionInPixels(): IPoint {
			return {
				x: this.position.x * this.cellSize.width,
				y: this.position.y * this.cellSize.height
			}
	}

	get canvasSizeInPixels(): ISize {
		return {
			width: this.cellSize.width * this.canvasSize.width,
			height: this.cellSize.height * this.canvasSize.height,
		}
	}

	setPosition(position: IPoint) {
		if (checkIfCoordinateIsInBounds(position, [0, 0], [this.canvasSize.width, this.canvasSize.height])) {
			this.position = position;
		} else {
			return
		}
	}

	moveCursor(direction: string) {

		let { x, y } = this.position;

		switch(direction) {
			case 'up':
				y -= 1
				this.setPosition({ x, y })
				break;
			case 'right':
				x += 1
				this.setPosition({ x, y })
				break;
			case 'down':
				y += 1
				this.setPosition({ x, y })
				break;
			case 'left':
				x -= 1
				this.setPosition({ x, y })
				break;
			default:
				console.log(`Received ${direction} from main process`);
		}
	}


	insert() {
		let svgPath = this.paths[9]
		const definition = new Paper.SymbolDefinition(new Paper.CompoundPath(this.paths[2]));
		let cellSize = new Paper.Size(this.cellSize.width, this.cellSize.height);
		let cursorPosition = new Paper.Point(this.positionInPixels.x, this.positionInPixels.y);
		let path = new Paper.CompoundPath({
			children: [
				new Paper.SymbolItem(definition)
			],
			bounds: new Paper.Rectangle(cursorPosition, cellSize),
			fillColor: new Paper.Color("black"),
			data: {
				position: {
					x: this.position.x,
					y: this.position.y
				}
			}
		});
		//console.log(JSON.stringify(Paper, undefined, 4))
	}

	rotate() {
		Paper.project.getItem({data: {
			position: {
				x: this.position.x,
				y: this.position.y
			}
		}}).rotate(90)
	}

	flip() {
		Paper.project.getItem({
			data: {
				position: {
					x: this.position.x,
					y: this.position.y
				}
			}
		}).scale(-1, 1);
	}

	remove() {
		Paper.project.getItem({data: {
			position: {
				x: this.position.x,
				y: this.position.y
			}
		}}).remove()
	}
}

export default new PaperStore
