import React from "react";
import FlexLayout, { TabNode, TabSetNode, BorderNode } from "flexlayout-react";
import "flexlayout-react/style/light.css";
import CanvasContainer from "./CanvasContainer";
import store from "renderer/stores/RootStore";
import { nanoid } from "nanoid";

export interface ITabSetRenderValues {
	headerContent?: React.ReactNode;
	stickyButtons: React.ReactNode[];
	buttons: React.ReactNode[];
	headerButtons: React.ReactNode[];
}

function MainLayout() {
	const factory = (node: TabNode) => {
		var component = node.getComponent();
		if (component === "canvas") {
			return <CanvasContainer id={node.getId()} />;
		} else {
			return <div>empty</div>;
		}
	};

	const onRenderTabSet = (
		node: TabSetNode | BorderNode,
		renderValues: ITabSetRenderValues
	) => {
		renderValues.stickyButtons.push(
			<div
				key="Add button"
				title="Add Tab"
				onClick={() => onAddFromTabSetButton(node)}
			>
				Add
			</div>
		);
	};

	const onAddFromTabSetButton = (node: TabSetNode | BorderNode) => {
		store.newProject(nanoid());
		console.log(node);
	};

	return (
		<div className="MainLayout">
			<FlexLayout.Layout
				ref={store.ui.layoutRef}
				model={store.ui.layoutModel}
				onRenderTabSet={onRenderTabSet}
				factory={factory}
				onAction={(e) => {
					if (e.type === "FlexLayout_SetActiveTabset") {
						console.log(e.data);
					}
					if (e.type === "FlexLayout_SelectTab") {
						store.updateCurrentProjectId(e.data.tabNode);
					}
					return e;
				}}
			/>
		</div>
	);
}

export default MainLayout;
