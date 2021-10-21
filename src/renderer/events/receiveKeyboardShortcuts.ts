import root from "renderer/stores/RootStore";

export const keyboardShortcutsReceiver = (window) => {
	window.electron.receive("fromMain", (action: string) => {
		switch (action) {
			case "Q":
				root.action.insert();
				break;
			case "E":
				root.action.remove();
				break;
			case "F":
				root.action.flip();
				break;
			case "R":
				root.action.rotate();
				break;
			case "Up":
				root.action.moveCursor("up");
				break;
			case "Right":
				root.action.moveCursor("right");
				break;
			case "Down":
				root.action.moveCursor("down");
				break;
			case "Left":
				root.action.moveCursor("left");
				break;
			default:
				console.log(`Received ${action} from main process`);
		}
	});
};
