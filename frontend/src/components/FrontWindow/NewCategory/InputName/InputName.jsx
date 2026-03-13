import "./InputName.css"
import {useState} from "react";


function InputName({ setCategoryName }) {
	const [error, setError] = useState(null);

	const ChangeHandler = (e) => {
		const value = e.target.value.trim();
		if (value.length > 24) {
			setError("Слишком длинное название");
		} else {
			setCategoryName(value.trim());
			setError(null);
		}
	}

	return (
		<div className="nc-container name">
			<div className="nc-title">Название</div>
			<input
				type="text"
				className="input-name-field"
				onChange={ChangeHandler}
				placeholder="Введите название"
			/>
			<span className={`error-text${error !== null ? " show" : ""}`}>
					{error !== null ? error : " "}
				</span>
		</div>
	)
}

export default InputName;