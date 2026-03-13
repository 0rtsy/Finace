import "./CreateButton.css"
import {useState} from "react";
import recordsApi from "../../../api/recordsApi";
import useLoadFamilyData from "../../../hooks/useLoadFamilyData";
import useLoadRecordsData from "../../../hooks/useLoadRecordsData";
import useLoadCategoriesData from "../../../hooks/useLoadCategoriesData";


function CreateButton(
	{ newRecordData, clearNewRecordData, createNewNotification, updateFamilyData, updateRecordsData, updateCategoriesData }
) {
	const [buttonText, setButtonText] = useState("Создать");
	const updateFamilyDataFunction = useLoadFamilyData(updateFamilyData, false);
	const updateRecordsDataFunction = useLoadRecordsData(updateRecordsData, false);
	const updateCategoriesDataFunction = useLoadCategoriesData(updateCategoriesData, false);

	let isCanCreate = false;
	if (
		newRecordData.type !== "null" &&
		newRecordData.sum !== 0 && newRecordData.sum !== null
	) {
		isCanCreate = true;
	}

	const ClickHandler = async (e) => {
		isCanCreate = false;
		e.target.disabled = true;
		setButtonText("Создание...");

		const answer = await recordsApi.createNewRecord(
			newRecordData.type,
			newRecordData.sum,
			newRecordData.description,
			newRecordData.categoryId
		)

		if (!answer.status) {
			isCanCreate = true;
			e.target.disabled = false;
			setButtonText("Создать");
			createNewNotification(
				"error",
				answer.msg
			);
		} else {
			e.target.disabled = false;
			setButtonText("Создать");
			clearNewRecordData();
			createNewNotification(
				"success",
				"Новая запись успешно добавлена!"
			)
			await updateFamilyDataFunction();
			await updateRecordsDataFunction();
			await updateCategoriesDataFunction();
		}
	}

	return (
		<button
			className={`nrc-create-button ${isCanCreate ? 'active' : 'disabled'}`}
			onClick={(e) => ClickHandler(e)}
			disabled={!isCanCreate}
		>
			{buttonText}
		</button>
	)
}

export default CreateButton;