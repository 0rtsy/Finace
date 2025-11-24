import "./Header.css"
import React from "react";

import { ReactComponent as HomeIcon } from "../../assets/icons/bank_piggy.svg"
import { ReactComponent as CategoriesIcon } from "../../assets/icons/categories.svg"
import { ReactComponent as FamilyIcon } from "../../assets/icons/family.svg"
import { ReactComponent as HistoryIcon } from "../../assets/icons/history.svg"

class Header extends React.Component {
	render() {
		const { activeTab, user } = this.props;

		return (
			<header className={`main-header ${ activeTab === "new-record" ? "hide" : "show" }`}>
				<div className="screen-title">
					{ activeTab === "home" && <><HomeIcon className="header-icon"/>Главная</> }
					{ activeTab === "categories" && <><CategoriesIcon className="header-icon"/>Категории</> }
					{ activeTab === "new-record" && <>:o</> }
					{ activeTab === "family" && <><FamilyIcon className="header-icon"/>Моя семья</> }
					{ activeTab === "history" && <><HistoryIcon className="header-icon"/>История</> }
				</div>

				<div className="user-title">
					<div className="user-role">{ user.role }</div>
					<div className="user-avatar">{ user.name[0] }</div>
				</div>
			</header>
		)
	}
}

export default Header;