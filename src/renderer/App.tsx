import React from 'react';
import './App.global.css';
import Canvas from './components/Canvas';
import { observer } from 'mobx-react';

function App() {
	return (
		<div className="CanvasContainer">
			<Canvas />
		</div>
  );
}

export default observer(App);
