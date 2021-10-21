import { makeAutoObservable } from "mobx";

interface RegisteredAction {
	undo(): void;
	redo(): void;
}

export interface Command {
	execute(): RegisteredAction;
}

class CommandStore {
	public commands: RegisteredAction[] = [];
	protected currentIndex = -1;

	constructor() {
		makeAutoObservable(this);
	}

	// add a command to the stack which was executed elsewhere
	didExecute(command: RegisteredAction): void {
		this.currentIndex++;
		this.commands.splice(this.currentIndex, this.commands.length, command);
	}

	// trigger execution of a command from here
	execute(command: Command): void {
		const action = command.execute();
		this.didExecute(action);
	}

	// the command to undo
	get currentCommand(): RegisteredAction | undefined {
		return this.commands[this.currentIndex];
	}

	// the command to redo
	get nextCommand(): RegisteredAction | undefined {
		return this.commands[this.currentIndex + 1];
	}

	// whether on not the current stack can be undone
	get canUndo(): boolean {
		return !!this.currentCommand;
	}

	// whether on not the current stack supports redo
	get canRedo(): boolean {
		return !!this.nextCommand;
	}

	// undo one command, if possible
	// could potentially return a boolean that indicates if an undo occurred
	undo(): void {
		if (this.currentCommand) {
			this.currentCommand.undo();
			this.currentIndex--;
		}
	}

	// redo one command, if possible
	redo(): void {
		if (this.nextCommand) {
			this.nextCommand.redo();
			this.currentIndex++;
		}
	}

	// undo all commands
	cancel(): void {
		while (this.currentIndex >= 0) {
			this.undo();
		}
	}
}

export default CommandStore;
