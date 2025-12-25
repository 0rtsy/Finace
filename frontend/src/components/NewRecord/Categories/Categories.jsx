import "./Categories.css"
import {ReactComponent as ShowIcon} from "../../../assets/icons/keyboard_arrow_down.svg";
import {ReactComponent as NoCategoryIcon} from "../../../assets/icons/book_question.svg";
import {useState} from "react";
import CategoryItem from "./CategoryItem/CategoryItem";

function Categories({ newRecordData, updateNewRecordData, categoriesInfo }) {
	const [isHide, setValue] = useState(true);

	const updateSelectedCategory = (id) => {
		updateNewRecordData({categoryId: id});
	}

	const categoriesListRows = Math.ceil(categoriesInfo.length / 3);

	return (
		<div className="nrc-categories">
			<div className="container-title">Категория</div>
			<div
				className={`nrc-categories-list ${isHide ? "short" : ""}`}
				style={{
					height: isHide ? "214px" : `${50 + (categoriesListRows * 77 + categoriesListRows * 5)}px`,
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
				{categoriesInfo.map((category, index) => (
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