import React from "react";
import { observer } from "mobx-react";
import store from "renderer/stores/RootStore";

const Cursor = (props) => (
	<div
		className="cursor"
		style={{
			boxShadow: `inset 0 0 0 1px red`,
			zIndex: 1000,
			pointerEvents: "none",
			width: store.openProjects[props.id].cellSize.width,
			height: store.openProjects[props.id].cellSize.height,
			transform: `translate(${
				store.openProjects[props.id].positionInPixels.x
			}px,
			${store.openProjects[props.id].positionInPixels.y}px)`,
			position: "absolute",
			left: 0,
			right: 0,
		}}
	></div>
);

export default observer(Cursor);
