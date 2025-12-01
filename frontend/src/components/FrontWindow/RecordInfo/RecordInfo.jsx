import "./RecordInfo.css"

import {Link, useNavigate} from "react-router"

import { ReactComponent as IconBack } from "../../../assets/icons/arrow_left.svg";
import { ReactComponent as IconDelete } from "../../../assets/icons/trash.svg";
import CategoryIcon from "../../CategoryIcon/CategoryIcon";

function RecordInfo({ data, recordsData }) {
	const formatDate = (timestamp) => {
		const date = new Date(timestamp);

		return new Intl.DateTimeFormat('ru-RU', {
			day: 'numeric',
			month: 'long',
			hour: 'numeric',
			minute: 'numeric'
		}).format(date);
	};

	let recordData;
	// Search record by id
	for (const recordsDaily of recordsData) {
		for (const record of recordsDaily.records) {
			 if (record.id === data.recordId) {
				 recordData = record;
				 break;
			 }
		}
	}

	let navigate = useNavigate();
	if (!recordData) {
		navigate("/app/history");
	}

	return (
		<div className="content">
			<header className="fw-header">
				<Link
					to="/app/history"
					className="back-button"
				>
					<IconBack className="icon"/>
				</Link>
				<div className="title-date">{formatDate(recordData.date)}</div>
				<div className="delete-button">
					<IconDelete className="icon"/>
				</div>
			</header>
			<div className="fw-value-title">
				<div className={`record-value ${recordData.type}`}>{recordData.sum}</div>
				<div
					className="category-container"
					style={{
						backgroundColor: `${recordData.color}33`
					}}
				>
					<CategoryIcon iconName={recordData.iconName} className="icon" style={{color: recordData.color}} />
					{recordData.name}
				</div>
			</div>
			<div className="fw-record-info">
				<div className="description">
					<span className="title">Описание</span>
					{recordData.description}
				</div>
				<div className="creator">
					<div className="title">Создатель</div>
					<div className="user-container">
						<div className="avatar">
							А.
						</div>
						<div className="user-info">
							<span className="name">Александр</span>
							Отец
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RecordInfo;