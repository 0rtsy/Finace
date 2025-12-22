import {ReactComponent as ShowIcon} from "../../../assets/icons/keyboard_arrow_down.svg";
import {useEffect, useState} from "react";

function Categories({ newRecordData, updateNewRecordData }) {
	const isHide = useState(true);

	return (
		<div className="nrc-categories">
			<div className="container-title">Категория</div>
			<div className="nrc-categories-list"></div>
			<div
				className="button-show-hide"
				onClick={() => {this.isHide = !isHide}}
			>
				<ShowIcon className="icon" />
				{ isHide ? <>Показать все</> : <>Скрыть</> }
			</div>
		</div>
	)
}

export default Categories;