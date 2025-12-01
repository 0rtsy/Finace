import "./Background.css"
import React from "react";

class Background extends React.Component {
	render() {
		const { activeTab } = this.props
		let panelHeight;

		switch (activeTab) {
			case "home":
				panelHeight = "187px";
				break;
			case "categories":
				panelHeight = "232px";
				break;
			case "history":
				panelHeight = "325px";
				break;
			case "new-record":
				panelHeight = "0px";
				break;
			default:
				panelHeight = "83px";
				break;
		}

		return (
			<div className="background-container">
				<div className="background-panel" style={{ height: panelHeight }}></div>
			</div>
		)
	}
}

export default Background;