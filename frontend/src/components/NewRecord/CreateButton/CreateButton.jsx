import "./CreateButton.css"
import {Link} from "react-router";


function CreateButton({ newRecordData, clearNewRecordData }) {
	let isCanCreate = false;
	if (
		newRecordData.type !== "null" &&
		newRecordData.sum !== 0 && newRecordData.sum !== null
	) {
		isCanCreate = true;
	}

	return (
		<>
			{ isCanCreate ? (
				<Link to="/app" className="nrc-create-button active" onClick={() => {clearNewRecordData()}}>
					Создать
				</Link>
			) : (
				<div className="nrc-create-button disabled">
					Создать
				</div>
			) }
		</>
	)
}

export default CreateButton;