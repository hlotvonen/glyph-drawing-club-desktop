const { contextBridge, ipcRenderer } = require('electron');

const exposedAPI = {
		send: (channel, data) => {
				// whitelist channels
				let validChannels = ["toMain"];
				if (validChannels.includes(channel)) {
						ipcRenderer.send(channel, data);
				}
		},
		receive: (channel, func) => {
				let validChannels = ["fromMain"];
				if (validChannels.includes(channel)) {
						// Deliberately strip event as it includes `sender`
						ipcRenderer.on(channel, (__event, ...args) => func(...args));
				}
		}
};

contextBridge.exposeInMainWorld('electron', exposedAPI);
