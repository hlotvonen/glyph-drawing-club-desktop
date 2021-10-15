import React from "react"
import { observer } from "mobx-react"
import PaperStore from "renderer/stores/PaperStore"

const Cursor = () => (
	<div
	className="cursor"
	style={{
		boxShadow: `inset 0 0 0 1px red`,
		zIndex: 1000,
		pointerEvents: "none",
		width: PaperStore.cellSize.width,
		height: PaperStore.cellSize.height,
		transform: `translate(${PaperStore.positionInPixels.x}px, ${PaperStore.positionInPixels.y}px)`,
		position: "absolute",
		left: 0,
		right: 0,
		}}
	>
	</div>
)

export default observer(Cursor)
