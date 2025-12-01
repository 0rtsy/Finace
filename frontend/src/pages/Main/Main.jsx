import "./Main.css";

import Background from '../../components/Background/Background';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Header from "../../components/Header/Header";
import FrontWindow from "../../components/FrontWindow/FrontWindow";
import {Outlet} from "react-router";


function Main({ store, activeTab, frontWindowData }) {
	return (
		<div className="container">
			<div className="app-container">
				<Background activeTab={activeTab} />
				<div className="main-container">
					<Header activeTab={activeTab} user={store.user} />
					<Outlet/>
				</div>
			</div>
			<NavigationBar activeTab={activeTab} />
			<FrontWindow
				frontWindowData={frontWindowData}
				store={store}
			/>
		</div>
	)
}

export default Main;