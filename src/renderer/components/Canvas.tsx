import React, { useRef, useLayoutEffect } from 'react';
import Paper from 'paper';
import { observer } from 'mobx-react';
import { keyboardShortcutsReceiver } from 'renderer/tools/receiveKeyboardShortcuts';
import PaperStore from 'renderer/stores/PaperStore';
import GridLines from './Canvas/GridLines';
import Cursor from './Canvas/Cursor';

const Canvas = (props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useLayoutEffect(() => {
		const canvas = canvasRef.current;
		Paper.setup(canvas!);
		keyboardShortcutsReceiver(window);
	}, []);

	return (
		<div className="canvas" style={{width: PaperStore.canvasSizeInPixels.width, height: PaperStore.canvasSizeInPixels.height}}>
			<canvas
				width={PaperStore.canvasSizeInPixels.width}
				height={PaperStore.canvasSizeInPixels.height}
				ref={canvasRef}
				{...props}
				id="canvas"
			/>
			<GridLines />
			<Cursor />
		</div>
	);
};

export default observer(Canvas);
