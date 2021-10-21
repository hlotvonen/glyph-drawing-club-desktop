import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";
import InsertCommand from "renderer/commands/InsertCommand";
import RotateCommand from "renderer/commands/RotateCommand";
import FlipCommand from "renderer/commands/FlipCommand";

class ActionStore {
	root: any; // TODO fix type

	constructor(root) {
		makeAutoObservable(this);
		this.root = root;
	}

	insert() {
		this.root.openProjects[this.root.currentProjectId].commands.execute(
			new InsertCommand(
				nanoid(),
				"M800 0L800 800L0 0Z",
				this.root.openProjects[this.root.currentProjectId].cellSize,
				this.root.openProjects[this.root.currentProjectId].positionInPixels,
				this.root.openProjects[this.root.currentProjectId].cursorPosition
			)
		);
	}

	rotate() {
		this.root.openProjects[this.root.currentProjectId].commands.execute(
			new RotateCommand(
				90,
				this.root.openProjects[this.root.currentProjectId].canvas.idFromPoint
			)
		);
	}

	flip() {
		this.root.openProjects[this.root.currentProjectId].commands.execute(
			new FlipCommand(
				this.root.openProjects[this.root.currentProjectId].canvas.idFromPoint
			)
		);
	}

	remove() {
		this.root.openProjects[this.root.currentProjectId].commands.undo();
	}

	moveCursor(direction: string) {
		let { x, y } =
			this.root.openProjects[this.root.currentProjectId].cursorPosition;

		switch (direction) {
			case "up":
				y -= 1;
				this.root.openProjects[this.root.currentProjectId].setPosition({
					x,
					y,
				});
				break;
			case "right":
				x += 1;
				this.root.openProjects[this.root.currentProjectId].setPosition({
					x,
					y,
				});
				break;
			case "down":
				y += 1;
				this.root.openProjects[this.root.currentProjectId].setPosition({
					x,
					y,
				});
				break;
			case "left":
				x -= 1;
				this.root.openProjects[this.root.currentProjectId].setPosition({
					x,
					y,
				});
				break;
			default:
				console.log(`Received ${direction} from main process`);
		}
	}
}

export default ActionStore;
