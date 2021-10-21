import React, { useEffect } from "react";
import { observer } from "mobx-react";
import Canvas from "renderer/components/Canvas/Canvas";
import store from "renderer/stores/RootStore";

const CanvasContainer = (props) => {
	const onMouseDown = () => {
		store.updateCurrentProjectId(props.id);
	};

	return (
		<div className="CanvasContainer" onMouseDown={onMouseDown}>
			<Canvas
				id={props.id}
				canvas_width={
					store.openProjects[store.currentProjectId].canvasSizeInPixels.width
				}
				canvas_height={
					store.openProjects[store.currentProjectId].canvasSizeInPixels.height
				}
			/>
		</div>
	);
};

export default observer(CanvasContainer);
