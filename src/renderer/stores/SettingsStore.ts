import { makeAutoObservable } from "mobx";

class SettingsStore {
	rootStore: ClassDecorator;

	constructor(rootStore) {
		makeAutoObservable(this);
		console.log("Settings");
		this.rootStore = rootStore;
	}
}

export default SettingsStore;
