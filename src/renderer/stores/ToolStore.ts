import { makeAutoObservable } from "mobx";

class ToolStore {
	rootStore: ClassDecorator;

	constructor(rootStore) {
		makeAutoObservable(this);
		console.log("Tool");
		this.rootStore = rootStore;
	}
}

export default ToolStore;
