import "./Stylization.css"
import {useState} from "react";
import CategoryIcon from "../../../CategoryIcon/CategoryIcon";


function Stylization({ categoryName, icon, setIcon, color, setColor, createCategory }) {
	const iconNames = [
		"no-category", "airplane", "bag", "baggage", "bank-piggy", "car", "child",
		"cutlery", "expenses", "family", "gift", "heart", "home", "income",
		"crown", "palm", "pc", "plus", "portfolio", "shopping-cart", "mobile-devices",
		"trash", "t-shirt", "user"
	];
	const colors = [
		"#ADB5BD", "#F44336", "#FF9800", "#FFC107",
		"#4CAF50", "#00BCD4", "#2196F3", "#9C27B0"
	];

	return (
		<div className="nc-container stylization">
			<div className="nc-title">Кастомизация</div>
			<div className="preview-title">
				<div className="icon-container" style={{ backgroundColor: `${color}33` }}>
					<CategoryIcon className="icon" iconName={icon} style={{ color: color }} />
				</div>
				<span className={`category-name${categoryName !== "" ? "" : " hidden"}`}>{categoryName}</span>
				<button
					className="create-button"
					disabled={categoryName === ""}
					onClick={() => createCategory()}
				>Создать</button>
			</div>
			<div className="select-icon">
				<div className="nc-title">Иконка</div>
				<div className="icons-container">
					{iconNames.map((iconName, index) => (
						<div
							key={index}
							className={`select-icon-button${iconName === icon ? " select" : ""}`}
							onClick={() => setIcon(iconName)}
						>
								<CategoryIcon className="icon" iconName={iconName} />
						</div>
					))}
				</div>
			</div>
			<div className="select-color">
				<div className="nc-title">Цвет</div>
				<div className="colors-container">
					{colors.map((colorPattern, index) => (
						<div
							key={index}
							className={`select-color-button${colorPattern === color ? " select" : ""}`}
							onClick={() => setColor(colorPattern)}
						>
							<div className="color-circle" style={{ backgroundColor: colorPattern }}></div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Stylization;