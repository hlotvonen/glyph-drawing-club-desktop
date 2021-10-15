import React from 'react';
import { observer } from 'mobx-react';
import paperstore from '../../stores/PaperStore';

const GridLines = () => {
	return (
		<svg
			className={'UiGrid'}
			width={paperstore.canvasSizeInPixels.width + 'px'}
			height={paperstore.canvasSizeInPixels.height + 'px'}
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<pattern
					id="smallGrid"
					width={paperstore.cellSize.width}
					height={paperstore.cellSize.height}
					patternUnits="userSpaceOnUse"
				>
					<path
						d={`M ${paperstore.cellSize.width} 0 L 0 0 0 ${paperstore.cellSize.height}`}
						fill="none"
						stroke="grey"
						strokeWidth="0.5"
					/>
				</pattern>
			</defs>
			<rect
				width="100%"
				height="100%"
				fill="url(#smallGrid)"
				stroke="black"
				strokeWidth="0.5"
			/>
		</svg>
	);
};
export default observer(GridLines);
