import "./CategoryItem.css"
import CategoryIcon from "../../../CategoryIcon/CategoryIcon";


function CategoryItem({ category, index, selectCategory, updateSelectedCategory }) {
	return (
		<div
			className={`nrc-category${category.id === selectCategory ? " select" : ""}`}
			onClick={() => {updateSelectedCategory(category.id)}}
		>
			<div className="icon-container" style={{ backgroundColor: category.color + "33" }} >
				<CategoryIcon
					iconName={category.iconName}
					className="icon"
					style={{
						color: category.color
					}}
				/>
			</div>
			{category.name}
		</div>
	)
}

export default CategoryItem;