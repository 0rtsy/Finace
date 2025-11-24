import React from "react";

import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as ShoppingCartIcon } from "../../assets/icons/shopping_cart.svg";
import { ReactComponent as BaggageIcon } from "../../assets/icons/baggage.svg";
import { ReactComponent as GiftIcon } from "../../assets/icons/gift.svg";
import { ReactComponent as CutleryIcon } from "../../assets/icons/cutlery.svg";
import { ReactComponent as CarIcon } from "../../assets/icons/car.svg";
import { ReactComponent as UnknownIcon } from "../../assets/icons/unknown.svg";

class CategoryIcon extends React.Component {
	render() {
		const { iconName, className, style } = this.props;
		let iconComponent;

		switch (iconName) {
			case "home":
				iconComponent = (<HomeIcon className={className} style={style} />);
				break;
			case "shopping-cart":
				iconComponent = (<ShoppingCartIcon className={className} style={style}/>);
				break;
			case "baggage":
				iconComponent = (<BaggageIcon className={className} style={style}/>);
				break;
			case "gift":
				iconComponent = (<GiftIcon className={className} style={style}/>);
				break;
			case "cutlery":
				iconComponent = (<CutleryIcon className={className} style={style}/>);
				break;
			case "car":
				iconComponent = (<CarIcon className={className} style={style}/>);
				break;
			default:
				iconComponent = (<UnknownIcon className={className} style={style}/>);
				break;
		}
		return (iconComponent);
	}
}

export default CategoryIcon;