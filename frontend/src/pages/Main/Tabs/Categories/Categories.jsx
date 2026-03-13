import "./Categories.css"

import {ReactComponent as CreateStickerIcon} from "../../../../assets/icons/sticker_plus.svg";
import {ReactComponent as ArrowDownIcon} from "../../../../assets/icons/arrow_down.svg";
import {ReactComponent as ArrowUpIcon} from "../../../../assets/icons/arrow_up.svg";
import CategoryIcon from "../../../../components/CategoryIcon/CategoryIcon";
import {Link} from "react-router";
import ValueLoading from "../../../../components/ValueLoading/ValueLoading";
import {useState} from "react";
import useLoadCategoriesData from "../../../../hooks/useLoadCategoriesData";


const CategoryItem = ({ category, index }) => {
	const typeColor = category.total.type === "expenses" ? "var(--expenses-color)" : "var(--income-color)";
	return (
		<Link
			to={`/app/categories/${category.id}`}
			className="category-container"
			style={{ animationDelay: `${index * 0.1}s` }}
		>
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
		</Link>
	);
}

function Categories({ categoriesInfo, updateCategoriesData }) {
	const [costLeaderName, setCostLeaderName] = useState(undefined);
	const [costLeaderIcon, setCostLeaderIcon] = useState(undefined);
	const [costLeaderColor, setCostLeaderColor] = useState(undefined);

	useLoadCategoriesData(updateCategoriesData, categoriesInfo.categories === undefined);

	if (categoriesInfo.costLeader.id !== undefined) {
		for (const category of categoriesInfo.categories) {
			if (category.id === categoriesInfo.costLeader.id) {
				setCostLeaderName(category.name);
				setCostLeaderIcon(category.iconName);
				setCostLeaderColor(category.color);
				break;
			}
		}
	}

	return (
		<div className="screen categories">
			<div className="categories-title">
				<div className="cost-leader">
					<div className="title">Лидер расходов</div>
					<div className="leader-info">
						{categoriesInfo.costLeader.id !== undefined
							? costLeaderName !== undefined
								? <>
										<div className="category-container">
											<CategoryIcon iconName={costLeaderIcon} className="icon" style={{
												color: costLeaderColor,
												backgroundColor: `${costLeaderColor}33`
											}}/>
											{costLeaderName}
										</div>
										<div className="leader-stat">
											<span className="value">-{categoriesInfo.costLeader.value}</span> за месяц
										</div>
									</>
								: <div className="no-leader">Информация отсутсвует</div>
							: <>
									<ValueLoading width="80%" height="60px"/>
									<ValueLoading width="70%" height="15px"/>
								</>
						}


					</div>
				</div>
				<Link to="/app/categories/new_category" className="create-category-button">
					<CreateStickerIcon className="icon"/>
					Создать категорию
				</Link>
			</div>
			<div className="categories-list">
				{categoriesInfo.categories !== undefined
					? categoriesInfo.categories.length !== 0
						? categoriesInfo.categories.map((item, index) => (
								<CategoryItem key={index} index={index} category={item}/>
							))
						: <div className="categories-list-empty">Здесь будут ваши категории</div>
					: <>
							<ValueLoading height="63px"/>
							<ValueLoading height="63px"/>
							<ValueLoading height="63px"/>
							<ValueLoading height="63px"/>
							<ValueLoading height="63px"/>
						</>
				}
			</div>
		</div>
	)
}

export default Categories;