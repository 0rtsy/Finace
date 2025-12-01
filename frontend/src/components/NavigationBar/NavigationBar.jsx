import "./NavigationBar.css";
import React from "react";

import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as CategoriesIcon } from "../../assets/icons/categories.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as FamilyIcon } from "../../assets/icons/family.svg";
import { ReactComponent as HistoryIcon } from "../../assets/icons/history.svg";
import {Link} from "react-router";

class NavigationBar extends React.Component {
	render() {
		const { activeTab } = this.props;

		return (
			<nav className="navigation-bar">
				<Link
					to="/app"
					className={"navigation-button nav-home" + (activeTab === "home" ? " active" : "")}
				>
					<HomeIcon className="nav-icon"/>
					Главная
				</Link>

				<Link
					to="/app/categories"
					className={"navigation-button nav-categories" + (activeTab === "categories" ? " active" : "")}
				>
					<CategoriesIcon className="nav-icon"/>
					Категории
				</Link>

				<Link
					to="/app/new-record"
					className={"navigation-button nav-new-record" + (activeTab === "new-record" ? " active" : "")}
				>
					<PlusIcon className="nav-icon"/>
				</Link>

				<Link
					to="/app/family"
					className={"navigation-button nav-family" + (activeTab === "family" ? " active" : "")}
				>
					<FamilyIcon className="nav-icon"/>
					Семья
				</Link>

				<Link
					to="/app/history"
					className={"navigation-button nav-history" + (activeTab === "history" ? " active" : "")}
				>
					<HistoryIcon className="nav-icon"/>
					История
				</Link>
			</nav>
		)
	}
}

export default NavigationBar;