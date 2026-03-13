import React from "react";

import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as ShoppingCartIcon } from "../../assets/icons/shopping_cart.svg";
import { ReactComponent as BaggageIcon } from "../../assets/icons/baggage.svg";
import { ReactComponent as GiftIcon } from "../../assets/icons/gift.svg";
import { ReactComponent as CutleryIcon } from "../../assets/icons/cutlery.svg";
import { ReactComponent as CarIcon } from "../../assets/icons/car.svg";
import { ReactComponent as UnknownIcon } from "../../assets/icons/unknown.svg";
import { ReactComponent as BookQuestionIcon } from "../../assets/icons/book_question.svg";
import { ReactComponent as AirplaneIcon } from "../../assets/icons/airplane.svg";
import { ReactComponent as BagIcon } from "../../assets/icons/bag.svg";
import { ReactComponent as BankPiggyIcon } from "../../assets/icons/bank_piggy.svg";
import { ReactComponent as ChildIcon } from "../../assets/icons/child.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/email.svg";
import { ReactComponent as ExpensesIcon } from "../../assets/icons/expenses_icon.svg";
import { ReactComponent as FamilyIcon } from "../../assets/icons/family.svg";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg";
import { ReactComponent as IncomeIcon } from "../../assets/icons/income-icon.svg";
import { ReactComponent as CrownIcon } from "../../assets/icons/owner_crown.svg";
import { ReactComponent as PalmIcon } from "../../assets/icons/palm.svg";
import { ReactComponent as PCIcon } from "../../assets/icons/pc.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as PortfolioIcon } from "../../assets/icons/portfolio.svg";
import { ReactComponent as MobileDevicesIcon } from "../../assets/icons/mobile_devices.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as TShirtIcon } from "../../assets/icons/tshirt.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";


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
			case "no-category":
				iconComponent = (<BookQuestionIcon className={className} style={style}/>);
				break;
			case "airplane":
				iconComponent = (<AirplaneIcon className={className} style={style}/>);
				break;
			case "bag":
				iconComponent = (<BagIcon className={className} style={style}/>);
				break;
			case "bank-piggy":
				iconComponent = (<BankPiggyIcon className={className} style={style}/>);
				break;
			case "child":
				iconComponent = (<ChildIcon className={className} style={style}/>);
				break;
			case "email":
				iconComponent = (<EmailIcon className={className} style={style}/>);
				break;
			case "expenses":
				iconComponent = (<ExpensesIcon className={className} style={style}/>);
				break;
			case "family":
				iconComponent = (<FamilyIcon className={className} style={style}/>);
				break;
			case "heart":
				iconComponent = (<HeartIcon className={className} style={style}/>);
				break;
			case "income":
				iconComponent = (<IncomeIcon className={className} style={style}/>);
				break;
			case "crown":
				iconComponent = (<CrownIcon className={className} style={style}/>);
				break;
			case "palm":
				iconComponent = (<PalmIcon className={className} style={style}/>);
				break;
			case "pc":
				iconComponent = (<PCIcon className={className} style={style}/>);
				break;
			case "plus":
				iconComponent = (<PlusIcon className={className} style={style}/>);
				break;
			case "portfolio":
				iconComponent = (<PortfolioIcon className={className} style={style}/>);
				break;
			case "mobile-devices":
				iconComponent = (<MobileDevicesIcon className={className} style={style}/>);
				break;
			case "trash":
				iconComponent = (<TrashIcon className={className} style={style}/>);
				break;
			case "t-shirt":
				iconComponent = (<TShirtIcon className={className} style={style}/>);
				break;
			case "user":
				iconComponent = (<UserIcon className={className} style={style}/>);
				break;
			default:
				iconComponent = (<UnknownIcon className={className} style={style}/>);
				break;
		}
		return (iconComponent);
	}
}

export default CategoryIcon;