import React, { useEffect } from "react";
import "./App.global.css";
import MainLayout from "./containers/MainLayout";
import { keyboardShortcutsReceiver } from "./events/receiveKeyboardShortcuts";

function App() {
	useEffect(() => {
		keyboardShortcutsReceiver(window);
	}, []);

	return <MainLayout />;
}

export default App;
