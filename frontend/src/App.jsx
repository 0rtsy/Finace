import './App.css';

import {BrowserRouter} from "react-router";
import AppRouters from "./AppRouters/AppRouters";


function App({ store }) {
	return (
		<BrowserRouter>
			<AppRouters store={store}></AppRouters>
		</BrowserRouter>
	)
}

export default App;
