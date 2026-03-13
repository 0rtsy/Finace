import "./History.css"
import React from 'react';
import HistoryRecords from "../../../../components/HistoryRecords/HistoryRecords";
import ValueLoading from "../../../../components/ValueLoading/ValueLoading";
import {ReactComponent as HistoryIcon} from "../../../../assets/icons/history.svg";
import useLoadRecordsData from "../../../../hooks/useLoadRecordsData";


function LoadingRecords() {
	return (
		<div className="loading-records-container">
			<ValueLoading width="90px" height="16px" />
			<ValueLoading width="calc(100% - 40px)" height="74px" />
			<ValueLoading width="calc(100% - 40px)" height="74px" />
			<ValueLoading width="90px" height="16px" />
			<ValueLoading width="calc(100% - 40px)" height="74px" />
		</div>
	)
}


function History({ recordsData, updateRecordsData }) {
	useLoadRecordsData(updateRecordsData, recordsData.recordsData === undefined);

	return (
		<div className="screen history">
			<div className="history-title">
				<div className="my-contribution">
					<header className="title">Ваш взнос в бюджет семьи</header>
					<div className="progress-container income">
						<div className="progress-type">Доходы</div>
						<div className="progress-bar" style={{ width: `${recordsData.totals.income.percent}%` }}></div>
						<div className="value">{
							recordsData.totals.income.sum === undefined
								? <ValueLoading width="70%" height="25px"/>
								: recordsData.totals.income.sum
						}</div>
					</div>
					<div className="progress-container expenses">
						<div className="progress-type">Расходы</div>
						<div className="progress-bar" style={{ width: `${recordsData.totals.expenses.percent}%` }}></div>
						<div className="value">{
							recordsData.totals.expenses.sum === undefined
								? <ValueLoading width="70%" height="25px"/>
								: recordsData.totals.expenses.sum
						}</div>
					</div>
				</div>
			</div>
			<div className="history-content">
				{ recordsData.recordsData === undefined
					? <LoadingRecords/>
					: recordsData.recordsData.length === 0
						? <div className="empty-list">
								<HistoryIcon className="icon"/>
								Здесь будут ваши записи
							</div>
						: recordsData.recordsData.map(
							(dailyRecordsData, index) => (
								<HistoryRecords
									key={index}
									dailyRecordsData={dailyRecordsData}
									index={index}
								/>
							)
						)
				}
			</div>
		</div>
	)
}

export default History;