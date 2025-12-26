import "./CreateButton.css"


function CreateButton({ newRecordData, clearNewRecordData, createNewNotification }) {
	let isCanCreate = false;
	if (
		newRecordData.type !== "null" &&
		newRecordData.sum !== 0 && newRecordData.sum !== null
	) {
		isCanCreate = true;
	}

	const ClickHandler = () => {
		clearNewRecordData();
		createNewNotification(
			"success",
			"Новая запись успешно добавлена!"
		);
	}

	return (
		<>
			{ isCanCreate ? (
				<div className="nrc-create-button active" onClick={() => {ClickHandler()}}>
					Создать
				</div>
			) : (
				<div className="nrc-create-button disabled">
					Создать
				</div>
			) }
		</>
	)
}

export default CreateButton;