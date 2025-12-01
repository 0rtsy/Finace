import {Component} from "react";
import "./Categories.css"

import {ReactComponent as CreateStickerIcon} from "../../../../assets/icons/sticker_plus.svg";
import {ReactComponent as ArrowDownIcon} from "../../../../assets/icons/arrow_down.svg";
import {ReactComponent as ArrowUpIcon} from "../../../../assets/icons/arrow_up.svg";
import CategoryIcon from "../../../../components/CategoryIcon/CategoryIcon";


const CategoryItem = ({ category, index }) => {
	const typeColor = category.total.type === "expenses" ? "var(--expenses-color)" : "var(--income-color)";
	return (
		<div className="category-container" style={{ animationDelay: `${index * 0.1}s` }}>
			<div className="title">
				<CategoryIcon
					iconName={category.iconName}
					className="icon"
					style={{
						color: category.color,
						backgroundColor: category.color + "33"
				}} />
				<div className="text">
					<span className="name">{category.name}</span>
					{category.records}
				</div>
			</div>
			<div
				className="monthly-result"
				style={{color: typeColor}}
			>
				{category.total.type === "expenses"
					? <ArrowDownIcon className="icon"/>
					: <ArrowUpIcon className="icon"/>}
				{category.total.value}
			</div>
		</div>
	);
}

class Categories extends Component {
	render() {
		const categoriesInfo = [
			{
				name: "Ресторан",
				iconName: "cutlery",
				color: "#9C27B0",
				records: "45 записей",
				total: {
					type: "expenses",
					value: "7542,55 ₽",
				}
			},
			{
				name: "Магазин",
				iconName: "shopping-cart",
				color: "#2196F3",
				records: "4599 записей",
				total: {
					type: "expenses",
					value: "96 535,34 ₽",
				}
			},
			{
				name: "Магазин",
				iconName: "shopping-cart",
				color: "#2196F3",
				records: "4599 записей",
				total: {
					type: "expenses",
					value: "96 535,34 ₽",
				}
			},
			{
				name: "Ресторан",
				iconName: "cutlery",
				color: "#9C27B0",
				records: "45 записей",
				total: {
					type: "expenses",
					value: "7542,55 ₽",
				}
			},
			{
				name: "Магазин",
				iconName: "shopping-cart",
				color: "#2196F3",
				records: "4599 записей",
				total: {
					type: "expenses",
					value: "96 535,34 ₽",
				}
			},
			{
				name: "Машина",
				iconName: "car",
				color: "#FF9800",
				records: "11 записей",
				total: {
					type: "expenses",
					value: "2 536 066,10 ₽",
				}
			},
			{
				name: "Работа",
				iconName: "baggage",
				color: "#F44336",
				records: "19 записей",
				total: {
					type: "income",
					value: "75 331,74 ₽",
				}
			},
			{
				name: "Магазин",
				iconName: "shopping-cart",
				color: "#2196F3",
				records: "4599 записей",
				total: {
					type: "expenses",
					value: "96 535,34 ₽",
				}
			},
			{
				name: "Магазин",
				iconName: "shopping-cart",
				color: "#2196F3",
				records: "4599 записей",
				total: {
					type: "expenses",
					value: "96 535,34 ₽",
				}
			},
			{
				name: "Ресторан",
				iconName: "cutlery",
				color: "#9C27B0",
				records: "45 записей",
				total: {
					type: "expenses",
					value: "7542,55 ₽",
				}
			},
			{
				name: "Магазин",
				iconName: "shopping-cart",
				color: "#2196F3",
				records: "4599 записей",
				total: {
					type: "expenses",
					value: "96 535,34 ₽",
				}
			},
			{
				name: "Магазин",
				iconName: "shopping-cart",
				color: "#2196F3",
				records: "4599 записей",
				total: {
					type: "expenses",
					value: "96 535,34 ₽",
				}
			},
			{
				name: "Ресторан",
				iconName: "cutlery",
				color: "#9C27B0",
				records: "45 записей",
				total: {
					type: "expenses",
					value: "7542,55 ₽",
				}
			},
			{
				name: "Магазин",
				iconName: "shopping-cart",
				color: "#2196F3",
				records: "4599 записей",
				total: {
					type: "expenses",
					value: "96 535,34 ₽",
				}
			},
			{
				name: "Магазин",
				iconName: "shopping-cart",
				color: "#2196F3",
				records: "4599 записей",
				total: {
					type: "expenses",
					value: "96 535,34 ₽",
				}
			},
		]

		return (
			<div className="screen categories">
				<div className="categories-title">
					<div className="cost-leader">
						<div className="title">Лидер расходов</div>
						<div className="leader-info">
							<div className="category-container">
								<CategoryIcon iconName="shopping-cart" className="icon"/>
								Рестораны
							</div>
							<div className="leader-stat">
								<span className="value">-73 974,76 ₽</span> за месяц
							</div>
						</div>
					</div>
					<div className="create-category-button">
						<CreateStickerIcon className="icon"/>
						Создать категорию
					</div>
				</div>
				<div className="categories-list">
					{categoriesInfo.map((item, index) => (
						<CategoryItem key={index} index={index} category={item}/>
					))}
				</div>
			</div>
		)
	}
}

export default Categories;