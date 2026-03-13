import "./Main.css";

import Background from '../../components/Background/Background';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Header from "../../components/Header/Header";
import FrontWindow from "../../components/FrontWindow/FrontWindow";
import {Outlet} from "react-router";
import Notifications from "../../components/Notifications/Notifications";
import {useEffect} from "react";
import useLoadUserInfo from "../../hooks/useLoadUserInfo";
import useLoadFamilyData from "../../hooks/useLoadFamilyData";


function Main({ store, activeTab, frontWindowData }) {
	useEffect(() => {
		document.body.style.backgroundColor = "var(--bg-color)";
	})

	useLoadUserInfo(store.updateUserData, store.user.id === undefined);
	useLoadFamilyData(store.updateFamilyData, store.familyData.ownerId === undefined)

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
			<Notifications notification={store.notification} deleteNotification={store.deleteNotification} />
			<FrontWindow
				frontWindowData={frontWindowData}
				store={store}
			/>
		</div>
	)
}

export default Main;