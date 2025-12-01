import "./Home.css"
import { Component } from "react";

import MonthlyResults from "../../../../components/Home/MonthlyResults/MonthlyResults";
import TestGraphic from "../../../../components/Home/TestGraphic/TestGraphic";

class Home extends Component {
	render() {
		return (
			<div className="screen home">
				<div className="home-title">
					<div className="family-financial-situation">
						<span className="title">Общее финансовое положение семьи</span>
						<span className="value">485 160,32 ₽</span>
					</div>
				</div>
				<div className="content">
					<MonthlyResults/>
					<TestGraphic/>
				</div>
			</div>

		)
	}
}

export default Home;