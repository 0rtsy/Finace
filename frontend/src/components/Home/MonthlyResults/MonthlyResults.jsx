import "./MonthlyResults.css"
import React from "react";

import { ReactComponent as IncomeIcon } from "../../../assets/icons/income-icon.svg"
import { ReactComponent as ExpensesIcon } from "../../../assets/icons/expenses_icon.svg"

class MonthlyResults extends React.Component {
	render () {
		return (
			<div className="monthly-results-container">
				<header className="header">
					<span className="title">Итоги за Ноябрь</span>
					<span className="nav-link">Подробнее</span>
				</header>
				<div className="container-content">
					<div className="result-container income">
						<div className="title">
							<IncomeIcon className="icon"/>
							Доходы
						</div>
						<div className="value">88 888 888,88 ₽</div>
						<div className="percent">+13%</div>
					</div>

					<div className="result-container expenses">
						<div className="title">
							<ExpensesIcon className="icon"/>
							Расходы
						</div>
						<div className="value">88 888 888,88 ₽</div>
						<div className="percent">-13%</div>
					</div>
				</div>
			</div>
		)
	}
}

export default MonthlyResults;