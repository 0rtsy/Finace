import "./NewCategory.css"

import {Link} from "react-router"

import { ReactComponent as IconBack } from "../../../assets/icons/arrow_left.svg";

function NewCategory() {
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
			<div className="nc-container name">
				<div className="nc-title">Название</div>
				<div className="content">Я контент</div>
			</div>
		</div>
	)
}

export default NewCategory;