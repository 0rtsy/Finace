import "./History.css"
import React from 'react';
import HistoryRecords from "../../../../components/HistoryRecords/HistoryRecords";

function History({ recordsData }) {
	return (
		<div className="screen history">
			<div className="history-title">
				<div className="my-contribution">
					<header className="title">Ваш взнос в бюджет семьи</header>
					<div className="progress-container income">
						<div className="progress-type">Доходы</div>
						<div className="progress-bar" style={{ width: `${recordsData.totals.income.percent}%` }}></div>
						<div className="value">{recordsData.totals.income.sum}</div>
					</div>
					<div className="progress-container expenses">
						<div className="progress-type">Расходы</div>
						<div className="progress-bar" style={{ width: `${recordsData.totals.expenses.percent}%` }}></div>
						<div className="value">{recordsData.totals.expenses.sum}</div>
					</div>
				</div>
			</div>
			<div className="history-content">
				{recordsData.recordsData.map(
					(dailyRecordsData, index) => (
						<HistoryRecords
							key={index}
							dailyRecordsData={dailyRecordsData}
							index={index}
						/>
					)
				)}
			</div>
		</div>
	)
}

export default History;