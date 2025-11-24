import "./NavigationBar.css";
import React from "react";

import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as CategoriesIcon } from "../../assets/icons/categories.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as FamilyIcon } from "../../assets/icons/family.svg";
import { ReactComponent as HistoryIcon } from "../../assets/icons/history.svg";

class NavigationBar extends React.Component {
	render() {
		const { activeTab, setActiveTab } = this.props;

		return (
			<nav className="navigation-bar">
				<div
					className={"navigation-button nav-home" + (activeTab === "home" ? " active" : "")}
					onClick={() => setActiveTab("home")}
				>
					<HomeIcon className="nav-icon"/>
					Главная
				</div>

				<div
					className={"navigation-button nav-categories" + (activeTab === "categories" ? " active" : "")}
					onClick={() => setActiveTab("categories")}
				>
					<CategoriesIcon className="nav-icon"/>
					Категории
				</div>

				<div
					className={"navigation-button nav-new-record" + (activeTab === "new-record" ? " active" : "")}
					onClick={() => setActiveTab("new-record")}
				>
					<PlusIcon className="nav-icon"/>
				</div>

				<div
					className={"navigation-button nav-family" + (activeTab === "family" ? " active" : "")}
					onClick={() => setActiveTab("family")}
				>
					<FamilyIcon className="nav-icon"/>
					Семья
				</div>

				<div
					className={"navigation-button nav-history" + (activeTab === "history" ? " active" : "")}
					onClick={() => setActiveTab("history")}
				>
					<HistoryIcon className="nav-icon"/>
					История
				</div>
			</nav>
		)
	}
}

export default NavigationBar;