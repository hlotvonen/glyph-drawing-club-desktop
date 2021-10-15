const EventEmitter = require('events');
const electronLocalshortcut = require('electron-localshortcut');

class KeyboardShortcutsEmitter extends EventEmitter {}
export const keyboardShortcutsEmitter = new KeyboardShortcutsEmitter();

keyboardShortcutsEmitter.on('registerKeyboardShortcuts', (mainWindow) => {

	if (mainWindow !== null) {
		electronLocalshortcut.register(mainWindow, 'Q', () => {
			mainWindow.webContents.send("fromMain", 'Q');
		});
		electronLocalshortcut.register(mainWindow, 'R', () => {
			mainWindow.webContents.send("fromMain", 'R');
		});
		electronLocalshortcut.register(mainWindow, 'F', () => {
			mainWindow.webContents.send("fromMain", 'F');
		});
		electronLocalshortcut.register(mainWindow, 'E', () => {
			mainWindow.webContents.send("fromMain", 'E');
		});
		electronLocalshortcut.register(mainWindow, 'Up', () => {
			mainWindow.webContents.send("fromMain", 'Up');
		});
		electronLocalshortcut.register(mainWindow, 'Right', () => {
			mainWindow.webContents.send("fromMain", 'Right');
		});
		electronLocalshortcut.register(mainWindow, 'Left', () => {
			mainWindow.webContents.send("fromMain", 'Left');
		});
		electronLocalshortcut.register(mainWindow, 'Down', () => {
			mainWindow.webContents.send("fromMain", 'Down');
		});
	} else {
		console.log('helo')
	}

});

keyboardShortcutsEmitter.on('unregisterKeyboardShortcuts', (mainWindow) => {
	electronLocalshortcut.unregisterAll(mainWindow);
});
