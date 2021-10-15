import PaperStore from "renderer/stores/PaperStore";

export const keyboardShortcutsReceiver = (window) => {
	window.electron.receive("fromMain", (action: any) => {
		switch(action) {
			case 'Q':
				PaperStore.insert();
				break;
			case 'E':
				PaperStore.remove();
				break;
			case 'R':
				PaperStore.rotate();
			break;
			case 'F':
				PaperStore.flip();
				break;
			case 'Up':
				PaperStore.moveCursor('up');
				break;
			case 'Right':
				PaperStore.moveCursor('right');
				break;
			case 'Down':
				PaperStore.moveCursor('down');
				break;
			case 'Left':
				PaperStore.moveCursor('left');
				break;
			default:
				console.log(`Received ${action} from main process`);
		}
	});
};
