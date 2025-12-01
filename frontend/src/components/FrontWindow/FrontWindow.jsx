import "./FrontWindow.css"
import React from 'react';
import RecordInfo from "./RecordInfo/RecordInfo";

function FrontWindow({ frontWindowData, store }) {
	let active = "hide";
	let type;
	if (frontWindowData.type !== undefined) {
		active = "view";
		type = frontWindowData.type;
	}
	return (
		<div className={`front-window ${active}`} >
			{ type === "recordInfo" && <RecordInfo data={frontWindowData.data} recordsData={store.records.recordsData} />}
		</div>
	)
}

export default FrontWindow;