import "./NewCategory.css"

import {Link, useNavigate} from "react-router"

import { ReactComponent as IconBack } from "../../../assets/icons/arrow_left.svg";
import InputName from "./InputName/InputName";
import Stylization from "./Stylization/Stylization";
import {useState} from "react";
import categoriesApi from "../../../api/categoriesApi";
import useLoadCategoriesData from "../../../hooks/useLoadCategoriesData";



function NewCategory({ updateCategoriesData, createNotification }) {
	const [categoryName, setCategoryName] = useState("");
	const [icon, setIcon] = useState("no-category");
	const [color, setColor] = useState("#ADB5BD");
	const navigate = useNavigate();
	const updateCategories = useLoadCategoriesData(updateCategoriesData, false);

	const createCategory = async () => {
		if (categoryName === "") {
			return null;
		}

		const answer = await categoriesApi.create(categoryName, icon, color);
		if (!answer.status) {
			createNotification("error", "Ошибка создания категории. Попробуйте позже");
		} else {
			updateCategories();
			createNotification("success", "Категория успешно создана");
			navigate("/app/categories");
		}
	}

	return (
		<div className="content">
			<header className="fw-header">
				<Link
					to="/app/categories"
					className="back-button"
				>
					<IconBack className="icon"/>
				</Link>
				<div className="sector-title">Новая категория</div>
			</header>
			<div className="containers">
				<InputName setCategoryName={setCategoryName} />
				<Stylization
					categoryName={categoryName}
					icon={icon} setIcon={setIcon}
					color={color} setColor={setColor}
					createCategory={createCategory}
				/>
			</div>
		</div>
	)
}

export default NewCategory;