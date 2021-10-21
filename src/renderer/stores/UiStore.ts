import { makeAutoObservable, when } from "mobx";
import FlexLayout, { IJsonModel, Model, TabNode } from "flexlayout-react";
import { createRef, RefObject } from "react";

var basic: IJsonModel = {
	global: {
		tabEnableRename: true,
	},
	borders: [],
	layout: {
		type: "row",
		id: "#mainlayout",
		children: [
			{
				type: "tabset",
				id: "#canvases",
				children: [],
				active: true,
			},
		],
	},
};

class UiStore {
	rootStore: any; //TODO!
	layoutRef: any; //TODO!
	layoutModel: Model;
	refCreated: boolean;

	constructor() {
		makeAutoObservable(this);
		this.layoutModel = FlexLayout.Model.fromJson(basic);
		this.layoutRef = createRef();
		this.refCreated = false;

		when(
			() => this.layoutRef.current,
			() => (this.refCreated = true)
		);
	}

	addCanvas(id) {
		this.layoutRef.current.addTabToActiveTabSet({
			component: "canvas",
			name: "Untitled",
			id: id,
		});
	}
}

export default UiStore;
