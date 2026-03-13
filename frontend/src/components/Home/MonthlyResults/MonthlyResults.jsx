import "./MonthlyResults.css"
import React from "react";

import { ReactComponent as IncomeIcon } from "../../../assets/icons/income-icon.svg"
import { ReactComponent as ExpensesIcon } from "../../../assets/icons/expenses_icon.svg"
import ValueLoading from "../../ValueLoading/ValueLoading";

function MonthlyResults({ forMonth }) {
	return (
		<div className="monthly-results-container">
			<header className="header">
				<span className="title">Итоги за месяц</span>
				<span className="nav-link">Подробнее</span>
			</header>
			<div className="container-content">
				<div className="result-container income">
					<div className="title">
						<IncomeIcon className="icon"/>
						Доходы
					</div>
					<div className="value">
						{forMonth.income.amount === undefined
							? <ValueLoading width="90%" height="18px" />
							: forMonth.income.amount
						}
					</div>
					<div className="percent">
						{forMonth.income.percent === undefined
							? <ValueLoading width="40px" height="11px"/>
							: forMonth.income.percent
						}
					</div>
				</div>

				<div className="result-container expenses">
					<div className="title">
						<ExpensesIcon className="icon"/>
						Расходы
					</div>
					<div className="value">
						{forMonth.expenses.amount === undefined
							? <ValueLoading width="90%" height="18px" />
							: forMonth.expenses.amount
						}
					</div>
					<div className="percent">
						{forMonth.expenses.percent === undefined
							? <ValueLoading width="40px" height="11px"/>
							: forMonth.expenses.percent
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MonthlyResults;