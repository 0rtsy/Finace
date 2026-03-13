import React from "react";
import {Route, Routes, useLocation} from "react-router";

import Main from "../pages/Main/Main";
import FrontWindow from "../components/FrontWindow/FrontWindow";
import Home from "../pages/Main/Tabs/Home/Home";
import Categories from "../pages/Main/Tabs/Categories/Categories";
import History from "../pages/Main/Tabs/History/History";
import NewRecord from "../pages/Main/Tabs/NewRecord/NewRecord";
import Auth from "../pages/Auth/Auth";
import Family from "../pages/Main/Tabs/Family/Family";
import FamilyManager from "../pages/FamilyManager/FamilyManager";

function AppRouter({ store }) {
	const location = useLocation();

	const getActiveTab = (pathname) => {
		const segments = pathname.replace(/^\/|\/$/g, '').split('/');
		let firstSegment = segments[1];
		let frontWindowData = {type: undefined, data: {}};

		if (!firstSegment) {
			firstSegment = "home";
		}
		else if (firstSegment === "history") {
			const segment2 = segments[2];
			if (segment2 !== undefined) {
				frontWindowData = {
					type: "recordInfo",
					data: {recordId: segment2}
				}
			}
		}
		else if (firstSegment === "categories") {
			const segment2 = segments[2];
			if (segment2 === "new_category") {
				frontWindowData = {
					type: "newCategory",
					data: {}
				}
			} else if (segment2 !== undefined) {
				frontWindowData = {
					type: "categoryInfo",
					data: segment2
				}
			}
		}

		return [firstSegment, frontWindowData];
	}
	const [activeTab, frontWindowData] = getActiveTab(location.pathname);

	// console.log(store);

	return (
		<Routes>
			{/* Страница самого приложения */}
			<Route path="/app" element={<Main store={store} activeTab={activeTab} frontWindowData={frontWindowData} />}>
				<Route index element={<Home familyData={store.familyData}/>} />
				<Route
					path="categories"
					element={
						<Categories
							categoriesInfo={store.categoriesInfo}
							updateCategoriesData={store.updateCategoriesData}
						/>
					}
				>
					<Route path="new_category" element={<FrontWindow isActive={true} type="newCategory" />} />
					<Route path=":categoryId" element={<FrontWindow isActive={true} type="categoryInfo" />} />
				</Route>
				<Route
					path="new-record"
					element={
						<NewRecord
							newRecordData={store.newRecordData}
							updateNewRecordData={store.updateNewRecordData}
							clearNewRecordData={store.clearNewRecordData}
							categoriesInfo={store.categoriesInfo}
							createNewNotification={store.createNewNotification}
							updateFamilyData={store.updateFamilyData}
							updateRecordsData={store.updateRecordsData}
							updateCategoriesData={store.updateCategoriesData}
						/>
					}
				/>
				<Route
					path="family"
					element={<Family />}
				/>
				<Route
					path="history"
					element={<History
						recordsData={store.records}
						updateRecordsData={store.updateRecordsData}
					/>}
				>
					<Route path=":recordID" element={<FrontWindow isActive={true} type="recordInfo" />} />
				</Route>
			</Route>

			{/* Страница входа и регистрации */}
			<Route path="/" element={<Auth />} />

			{/* Страница создания/присоединения к семье */}
			<Route path="/family" element={<FamilyManager/>} />

		</Routes>
	)
}

export default AppRouter;