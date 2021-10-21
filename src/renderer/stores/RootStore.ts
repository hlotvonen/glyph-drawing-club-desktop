import { makeAutoObservable, when } from "mobx";
import ProjectStore from "./ProjectStore";
import ToolStore from "./ToolStore";
import SettingsStore from "./SettingsStore";
import UiStore from "./UiStore";
import ActionStore from "./ActionStore";
import { nanoid } from "nanoid";

class RootStore {
	tool: ToolStore;
	settings: SettingsStore;
	ui: UiStore;
	action: ActionStore;
	currentProjectId: string;
	openProjects: {};

	constructor() {
		makeAutoObservable(this, { newProject: true });

		this.tool = new ToolStore(this);
		this.settings = new SettingsStore(this);
		this.ui = new UiStore();
		this.action = new ActionStore(this);
		this.openProjects = {};
		this.currentProjectId = "";
		when(
			() => this.ui.refCreated,
			() => this.newProject(nanoid())
		);
	}

	newProject(id: string) {
		this.ui.addCanvas(id);
		this.openProjects[id] = new ProjectStore(id);
		this.currentProjectId = id;
	}

	selectCanvas(id: string) {
		this.openProjects[id].canvas.paper.activate();
		this.currentProjectId = id;
	}

	updateCurrentProjectId(id: string) {
		this.openProjects[id].canvas.paper.activate();
		this.currentProjectId = id;
	}
}

export default new RootStore();
