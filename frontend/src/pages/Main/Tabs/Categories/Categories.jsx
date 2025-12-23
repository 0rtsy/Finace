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

function Categories({ categoriesInfo }) {
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

export default Categories;