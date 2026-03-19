import "./Categories.css"
import {ReactComponent as ShowIcon} from "../../../assets/icons/keyboard_arrow_down.svg";
import {ReactComponent as NoCategoryIcon} from "../../../assets/icons/book_question.svg";
import {useState} from "react";
import CategoryItem from "./CategoryItem/CategoryItem";
import ValueLoading from "../../ValueLoading/ValueLoading";
import useLoadCategoriesData from "../../../hooks/useLoadCategoriesData";

function Categories({newRecordData, updateNewRecordData, categoriesInfo, updateCategoriesData}) {
	const [isHide, setValue] = useState(true);

	const updateSelectedCategory = (id) => {
		updateNewRecordData({categoryId: id});
	}

	useLoadCategoriesData(updateCategoriesData, categoriesInfo.categories === undefined);

	const categoriesListRows = categoriesInfo.categories
		? Math.ceil(categoriesInfo.categories.length / 3)
		: 2;

	return (
		<div className="nrc-categories">
			<div className="container-title">Категория</div>
			<div
				className={`nrc-categories-list ${isHide ? "short" : ""}`}
				style={{
					height: isHide
						? `${50 + ((categoriesListRows < 2 ? 1 : 2) * 77 + categoriesListRows * 5)}px`
						: `${50 + (categoriesListRows * 77 + categoriesListRows * 5)}px`, // 214px
				}}
			>
				<div
					className={`nrc-category no-select${newRecordData.categoryId === null ? " select" : ""}`}
					onClick={() => {updateSelectedCategory(null)}}
				>
					<div className="icon-container" style={{ backgroundColor: "#ADB5BD33" }}>
						<NoCategoryIcon className="icon" />
					</div>
					Без категории
				</div>
				{categoriesInfo.categories === undefined
					? <>
							<ValueLoading height="73px"/>
							<ValueLoading height="73px"/>
							<ValueLoading height="73px"/>
							<ValueLoading height="73px"/>
							<ValueLoading height="73px"/>
						</>
					: categoriesInfo.categories.map((category, index) => (
					<CategoryItem
						key={index}
						category={category}
						index={index}
						selectCategory={newRecordData.categoryId}
						updateSelectedCategory={updateSelectedCategory}
					/>
				))}
			</div>
			<div
				className={`button-show-hide ${isHide ? "hide" : ""}`}
				style={{ display: categoriesListRows > 2 ? "flex" : "none" }}
				onClick={() => {setValue(!isHide)}}
			>
				<ShowIcon className={`icon${isHide ? " hide" : ""}`} />
				{ isHide ? <span className="text">Показать все</span> : <span className="text">Скрыть</span> }

			</div>
		</div>
	)
}

export default Categories;