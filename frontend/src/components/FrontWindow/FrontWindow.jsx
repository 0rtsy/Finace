import "./FrontWindow.css"
import React from 'react';
import RecordInfo from "./RecordInfo/RecordInfo";
import NewCategory from "./NewCategory/NewCategory";
import CategoryInfo from "./CategoryInfo/CategoryInfo";

function FrontWindow({ frontWindowData, store }) {
	let active = "hide";
	let type;
	if (frontWindowData.type !== undefined) {
		active = "view";
		type = frontWindowData.type;
	}

	return (
		<div className={`front-window ${active}`} >
			{ type === "recordInfo" && <RecordInfo
				data={frontWindowData.data}
				recordsData={store.records.recordsData}
				familyData={store.familyData}
				user={store.user}
				updateCategoriesData={store.updateCategoriesData}
				updateFamilyData={store.updateFamilyData}
				updateRecordsData={store.updateRecordsData}
				createNewNotification={store.createNewNotification}
			/>}
			{ type === "newCategory" && <NewCategory
				updateCategoriesData={store.updateCategoriesData}
				createNotification={store.createNewNotification}
			/>}
			{ type === "categoryInfo" && <CategoryInfo
				categories={store.categoriesInfo.categories}
				categoryId={frontWindowData.data}
				createNewNotification={store.createNewNotification}
				updateRecordsData={store.updateRecordsData}
				updateCategoriesData={store.updateCategoriesData}
				user={store.user}
				familyOwnerId={store.familyData.ownerId}
			/> }
		</div>
	)
}

export default FrontWindow;