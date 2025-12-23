


class Store {
	main = {
	}

	user = {
		role: 'Родитель',
		name: 'Александр'
	}

	frontWindow = {
		isActive: false,
		type: "",
		data: {}
	}

	records = {
		totals: {
			"income": {
				sum: "8 561 205,36 ₽",
				percent: 30
			},
			"expenses": {
				sum: "65 350 524,91 ₽",
				percent: 70
			}
		},
		recordsData: [
			{
				date: "Сегодня",
				records: [
					{
						id: "123",
						type: "expenses",
						name: "Продукты",
						color: "#4CAF50",
						iconName: "shopping-cart",
						description: "Поход в магазин за едой",
						sum: "65 350 524,91 ₽",
						amount: 65_350_524.91,
						date: 1764259840000 // 1764259840.000
					},
					{
						id: "124",
						type: "income",
						name: "Работа",
						color: "#2196f3",
						iconName: "baggage",
						description: "Премия",
						sum: "35 891,45 ₽",
						amount: 35_891.45,
						date: 1700387280000
					},
					{
						id: "125",
						type: "expenses",
						name: "Коммуналка",
						color: "#F44336",
						iconName: "home",
						description: "Оплата",
						sum: "350 524,91 ₽",
						amount: 65_350_524.91,
						date: 1764259840000
					}
				]
			},
			{
				date: "Вчера",
				records: [
					{
						id: "126",
						type: "expenses",
						name: "Продукты",
						color: "#4CAF50",
						iconName: "shopping-cart",
						description: "Поход в магазин за едой",
						sum: "65 350 524,91 ₽",
						amount: 65_350_524.91,
						date: 1764259840000
					},
					{
						id: "127",
						type: "income",
						name: "Работа",
						color: "#2196f3",
						iconName: "baggage",
						description: "Премия",
						sum: "35 891,45 ₽",
						amount: 35_891.45,
						date: 1764259840000
					},
					{
						id: "128",
						type: "expenses",
						name: "Продукты",
						color: "#4CAF50",
						iconName: "shopping-cart",
						description: "Поход в магазин за едой",
						sum: "350 524,91 ₽",
						amount: 65_350_524.91,
						date: 1764259840000
					}
				]
			}
		]
	}

	newRecordData = {
		type: "null",
		sum: null,
		labelSum: "",
		description: "",
		categoryId: null,
		errorText: null
	}

	categoriesInfo = [
		{
			id: 351,
			name: "Ресторан",
			iconName: "cutlery",
			color: "#9C27B0",
			records: "45 записей",
			total: {
				type: "expenses",
				value: "7542,55 ₽",
			}
		},
		{
			id: 352,
			name: "Магазин",
			iconName: "shopping-cart",
			color: "#2196F3",
			records: "4599 записей",
			total: {
				type: "expenses",
				value: "96 535,34 ₽",
			}
		},
		{
			id: 353,
			name: "Магазин",
			iconName: "shopping-cart",
			color: "#2196F3",
			records: "4599 записей",
			total: {
				type: "expenses",
				value: "96 535,34 ₽",
			}
		},
		{
			id: 354,
			name: "Ресторан",
			iconName: "cutlery",
			color: "#9C27B0",
			records: "45 записей",
			total: {
				type: "expenses",
				value: "7542,55 ₽",
			}
		},
		{
			id: 355,
			name: "Магазин",
			iconName: "shopping-cart",
			color: "#2196F3",
			records: "4599 записей",
			total: {
				type: "expenses",
				value: "96 535,34 ₽",
			}
		},
		{
			id: 356,
			name: "Машина",
			iconName: "car",
			color: "#FF9800",
			records: "11 записей",
			total: {
				type: "expenses",
				value: "2 536 066,10 ₽",
			}
		},
		{
			id: 357,
			name: "Работа",
			iconName: "baggage",
			color: "#F44336",
			records: "19 записей",
			total: {
				type: "income",
				value: "75 331,74 ₽",
			}
		},
		{
			id: 358,
			name: "Магазин",
			iconName: "shopping-cart",
			color: "#2196F3",
			records: "4599 записей",
			total: {
				type: "expenses",
				value: "96 535,34 ₽",
			}
		},
		{
			id: 359,
			name: "Магазин",
			iconName: "shopping-cart",
			color: "#2196F3",
			records: "4599 записей",
			total: {
				type: "expenses",
				value: "96 535,34 ₽",
			}
		},
		{
			id: 360,
			name: "Ресторан",
			iconName: "cutlery",
			color: "#9C27B0",
			records: "45 записей",
			total: {
				type: "expenses",
				value: "7542,55 ₽",
			}
		},
		{
			id: 361,
			name: "Магазин",
			iconName: "shopping-cart",
			color: "#2196F3",
			records: "4599 записей",
			total: {
				type: "expenses",
				value: "96 535,34 ₽",
			}
		},
		{
			id: 362,
			name: "Магазин",
			iconName: "shopping-cart",
			color: "#2196F3",
			records: "4599 записей",
			total: {
				type: "expenses",
				value: "96 535,34 ₽",
			}
		},
		{
			id: 363,
			name: "Ресторан",
			iconName: "cutlery",
			color: "#9C27B0",
			records: "45 записей",
			total: {
				type: "expenses",
				value: "7542,55 ₽",
			}
		},
		{
			id: 364,
			name: "Магазин",
			iconName: "shopping-cart",
			color: "#2196F3",
			records: "4599 записей",
			total: {
				type: "expenses",
				value: "96 535,34 ₽",
			}
		},
		{
			id: 365,
			name: "Магазин",
			iconName: "shopping-cart",
			color: "#2196F3",
			records: "4599 записей",
			total: {
				type: "expenses",
				value: "96 535,34 ₽",
			}
		},
	]

	rerenderTree = () => {}

	updateNewRecordData = (
		{
			type = undefined,
			sum = undefined,
			labelSum = undefined,
			description = undefined,
			categoryId = undefined,
			errorText = undefined,
		}
	) => {
		this.newRecordData = {
			type: type !== undefined ? type : this.newRecordData.type,
			sum: sum !== undefined ? sum : this.newRecordData.sum,
			labelSum: labelSum !== undefined ? labelSum : this.newRecordData.labelSum,
			description: description !== undefined ? description : this.newRecordData.description,
			categoryId: categoryId !== undefined ? categoryId : this.newRecordData.categoryId,
			errorText: errorText !== undefined ? errorText : this.newRecordData.errorText
		};
		this.rerenderTree();
	}
	clearNewRecordData = () => {
		this.newRecordData = {
			type: "null",
			sum: null,
			labelSum: "",
			description: "",
			categoryId: null,
			errorText: null
		};
		this.rerenderTree();
	}
}

const store = new Store();

export default store;