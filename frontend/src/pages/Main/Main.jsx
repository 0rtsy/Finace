import "./Main.css";
import React from "react";

import Background from '../../components/Background/Background';
import Home from './Tabs/Home/Home';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Header from "../../components/Header/Header";
import Categories from "./Tabs/Categories/Categories";

class Main extends React.Component {
	state = {
		activeTab: 'home',
		user: {
			role: 'Родитель',
			name: 'Александр'
		}
	}

	setActiveTab = (activeTab) => {
		this.setState({ activeTab });
	}

	render() {
		return (
			<div className="container">
				<Background activeTab={this.state.activeTab}/>
				<div className="main-container">
					<Header activeTab={this.state.activeTab} user={this.state.user} />
					{this.state.activeTab === "home" && <Home/>}
					{this.state.activeTab === "categories" && <Categories />}
				</div>
				<NavigationBar activeTab={this.state.activeTab} setActiveTab={this.setActiveTab} />
			</div>
		)
	}
}

export default Main;