import "./Description.css"


function Description({ newRecordData, updateNewRecordData }) {
	const ChangeHandler = (e) => {
		updateNewRecordData({description: e.target.value});
	}

	return (
		<div className="description">
			<div className="description-title">Описание</div>
			<div className="text-field">
				<textarea
					className="nrc-text-area"
					placeholder="Введите описание"
					maxLength={150}
					onChange={ChangeHandler}
					value={newRecordData.description}
				/>
			</div>
		</div>
	)
}

export default Description;