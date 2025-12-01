import React from "react";
import "./HistoryRecords.css"
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import {NavLink} from "react-router";


function Record({ recordData }) {
	return (
		<NavLink
			to={`/app/history/${recordData.id}`}
			className={ "record " + recordData.type }
		>
			<CategoryIcon
				iconName={recordData.iconName}
				className="icon"
				style={{
					color: recordData.color,
					backgroundColor: recordData.color + "33", // 20%
				}}
			/>
			<div className="record-info">
				<span className="category-name">{recordData.name}</span><br/>
				{recordData.description}
			</div>
			<div className="record-value">{recordData.sum}</div>
		</NavLink>
	)
}


function HistoryRecords({ dailyRecordsData, index }) {
	return (
		<div className="daily-container" style={{ animationDelay: `${0.2 + (0.2 * index)}s` }}>
			<div className="daily-records-title">{dailyRecordsData.date}</div>
			{	dailyRecordsData.records.map((recordData, index) => (
				<Record
					key={index}
					recordData={recordData}
				/>
			)) }
		</div>
	)
}

export default HistoryRecords;