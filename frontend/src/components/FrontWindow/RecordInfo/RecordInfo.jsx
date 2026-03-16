import "./RecordInfo.css"

import {Link, useNavigate} from "react-router"

import { ReactComponent as IconBack } from "../../../assets/icons/arrow_left.svg";
import { ReactComponent as IconDelete } from "../../../assets/icons/trash.svg";
import CategoryIcon from "../../CategoryIcon/CategoryIcon";
import useLoadCategoriesData from "../../../hooks/useLoadCategoriesData";
import useLoadFamilyData from "../../../hooks/useLoadFamilyData";
import useLoadRecordsData from "../../../hooks/useLoadRecordsData";
import recordsApi from "../../../api/recordsApi";

function RecordInfo({
		data, recordsData, familyData, user,
		updateFamilyData, updateRecordsData, updateCategoriesData, createNewNotification
}) {
	const formatDate = (timestamp) => {
		const date = new Date(timestamp);

		return new Intl.DateTimeFormat('ru-RU', {
			day: 'numeric',
			month: 'long',
			hour: 'numeric',
			minute: 'numeric'
		}).format(date);
	};

	let navigate = useNavigate();
	const loadCategoriesData = useLoadCategoriesData(updateCategoriesData, false);
	const loadFamilyData = useLoadFamilyData(updateFamilyData, false);
	const loadRecordsData = useLoadRecordsData(updateRecordsData, false);

	let recordData, creator = undefined;

	// Search record by id
	if (recordsData && familyData.members) {
		for (const recordsDaily of recordsData) {
			for (const record of recordsDaily.records) {
				if (record.id === data.recordId) {
					recordData = record;
					break;
				}
			}
		}

		if (!recordData) {
			navigate("/app/history");
		}

		for (const member of familyData.members) {
			if (member.id === recordData.creator) {
				creator = member;
				break;
			}
		}
	}
	const clickDeleteButton = async () => {
		const answer = await recordsApi.deleteRecord(recordData.id);

		if (!answer.status) {
			createNewNotification("error", answer.msg);
			navigate("/app/history");
		} else {
			loadFamilyData();
			loadRecordsData();
			loadCategoriesData();
			createNewNotification("success", "Запись успешно удалена!");
			navigate("/app/history");
		}
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
				<div className="title-date">{recordData && formatDate(recordData.date)}</div>
				{recordData && (recordData.creator === user.id || user.id === familyData.ownerId )
					&& <div
						className="delete-button"
						onClick={() => clickDeleteButton()}
					>
						<IconDelete className="icon"/>
					</div>
				}
			</header>
			{recordData && <>
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
					{recordData.description !== "" &&
						<div className="description">
							<span className="title">Описание</span>
							{recordData.description}
						</div>
					}
					<div className="creator">
						<div className="title">Создатель</div>
						{creator && <div className="user-container">
							<div className={`avatar ${creator.avatar}`}>
								{creator.name[0]}
							</div>
							<div className="user-info">
								<span className="name">{creator.name}</span>
								{creator.role}
							</div>
						</div>}
					</div>
				</div>
			</>}
		</div>
	)
}

export default RecordInfo;