import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const rerenderTree = () => {
	root.render(
		<React.StrictMode>
			<App store={store}/>
		</React.StrictMode>
	);
}

store.rerenderTree = rerenderTree;
rerenderTree();