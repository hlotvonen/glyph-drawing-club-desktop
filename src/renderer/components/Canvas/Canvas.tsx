import React, { useEffect } from "react";
import { observer } from "mobx-react";
import store from "renderer/stores/RootStore";
import GridLines from "./GridLines";
import Cursor from "./Cursor";

const Canvas = (props) => {
	useEffect(() => {
		console.log("canvas", props.id);
	}, []);

	return (
		<div
			className="canvas"
			style={{
				width: store.openProjects[props.id].canvasSizeInPixels.width,
				height: store.openProjects[props.id].canvasSizeInPixels.height,
			}}
		>
			<canvas
				ref={(ref) => store.openProjects[props.id].createRef(ref)}
				width={store.openProjects[props.id].canvasSizeInPixels.width}
				height={store.openProjects[props.id].canvasSizeInPixels.height}
				{...props}
				id={props.id}
			/>
			<GridLines id={props.id} />
			<Cursor id={props.id} />
		</div>
	);
};

export default observer(Canvas);
