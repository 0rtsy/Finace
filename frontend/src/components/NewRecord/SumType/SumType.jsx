import "./SumType.css";

function SumType({ newRecordData, updateNewRecordData }) {
	const toNumber = (value) => {
		if (!value || value === '') {
			return null
		}

		// Заменяем запятые на точки
		const strValue = value.replace(/,/g, '.');

		// Удаляем всё, кроме цифр и точек
		let cleaned = strValue.replace(/[^\d.-]/g, '');

		// Удаляем лишние точки (оставляем только первую)
		const parts = cleaned.split('.');
		if (parts.length > 2) {
			cleaned = parts[0] + '.' + parts.slice(1).join('');
		}
		return Number(cleaned);
	}
	const formatNumber = (value) => {
		let cleaned = toNumber(value);

		updateNewRecordData({sum: cleaned});
		if (cleaned === null) return '';
		cleaned = cleaned.toString();

		// Разделяем на целую и дробную части
		const [integerPart, decimalPart = ''] = cleaned.split('.');

		// Форматируем целую часть с разделителями тысяч
		let formattedInteger = '';
		if (integerPart) {
			// Убираем ведущие нули (кроме последнего)
			let trimmedInteger = integerPart.replace(/^0+(?=\d)/, '');
			if (trimmedInteger === '') trimmedInteger = '0';

			formattedInteger = trimmedInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
		}

		// Обрабатываем дробную часть
		let formattedDecimal = '';
		if (decimalPart !== '') {
			// Ограничиваем до 2 знаков (сотых)
			const limitedDecimal = decimalPart.substring(0, 2);
			formattedDecimal = ',' + limitedDecimal;
		}

		return formattedInteger + formattedDecimal;
	};

	const BlurHandler = (e) => {
		updateNewRecordData({labelSum: formatNumber(e.target.value)});
	}
	const ChangeHandler = (e) => {
		const value = e.target.value.replace(/[^\d., ]/g, '');
		updateNewRecordData({labelSum: value});

		const sum = toNumber(value);
		if (sum !== null) {
			if (sum >= 10_000_000) {
				updateNewRecordData({errorText: "Сумма должна быть меньше 10 000 000 ₽"})
			} else {
				updateNewRecordData({errorText: null})
			}
		}
	}

	return (
		<div className="sum-type">
			<div className="sum-container">
				<div className="title">Сумма</div>
				<div className="input-sum-container">
					<input
						type="text"
						className="input-sum-field"
						placeholder="150 000"
						onBlur={BlurHandler}
						onChange={ChangeHandler}
						value={newRecordData.labelSum}
					/>
					<div className="val-symbol">₽</div>
				</div>
				<span className={`error-text${newRecordData.errorText !== null ? " show" : ""}`}>
					{newRecordData.errorText !== null ? newRecordData.errorText : " "}
				</span>
			</div>
			<div className={"type-container" + (newRecordData.type !== "null" ? " selected" : "")}>
				<div
					className={"type-button income" + (newRecordData.type === "income" ? " active" : "")}
					onClick={() => {updateNewRecordData({ type: "income" })}}
				>
					Доходы
				</div>
				<div
					className={"type-button expenses" + (newRecordData.type === "expenses" ? " active" : "")}
					onClick={() => {updateNewRecordData({ type: "expenses" })}}
				>
					Расходы
				</div>
			</div>
		</div>
	)
}

export default SumType;