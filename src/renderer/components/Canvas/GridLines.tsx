import React from "react";
import { observer } from "mobx-react";
import store from "renderer/stores/RootStore";

const GridLines = (props) => {
	return (
		<svg
			className={"UiGrid"}
			width={store.openProjects[props.id].canvasSizeInPixels.width + "px"}
			height={store.openProjects[props.id].canvasSizeInPixels.height + "px"}
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<pattern
					id={"gridlines_" + props.id}
					width={store.openProjects[props.id].cellSize.width}
					height={store.openProjects[props.id].cellSize.height}
					patternUnits="userSpaceOnUse"
				>
					<path
						d={`M ${store.openProjects[props.id].cellSize.width} 0 L 0 0 0 ${
							store.openProjects[props.id].cellSize.height
						}`}
						fill="none"
						stroke="blue"
						strokeWidth="0.5"
					/>
				</pattern>
			</defs>
			<rect
				width="100%"
				height="100%"
				fill={`url(#gridlines_${props.id})`}
				stroke="blue"
				strokeWidth="0.5"
			/>
		</svg>
	);
};
export default observer(GridLines);
