


class Store {
	main = {
	}

	user = {
		id: undefined,
		role: undefined,
		name: '?'
	}

	frontWindow = {
		isActive: false,
		type: "",
		data: {}
	}

	records = {
		totals: {
			income: {
				sum: undefined, // "8 561 205,36 ₽"
				percent: 0 // 30
			},
			expenses: {
				sum: undefined, // "65 350 524,91 ₽"
				percent: 0
			}
		},
		recordsData: undefined,
		recordsData__: [
			{
				date: "Сегодня",
				records: [
					{
						id: "123",
						type: "expenses",
						name: "Без категории", // Продукты
						color: "#ADB5BD", // #4CAF50
						iconName: "no-category", // shopping-cart
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

	notification = undefined;

	categoriesInfo = {
		costLeader: {
			id: undefined,
			value: undefined
		},
		categories: undefined,
		categoriesT: [
			{
				id: "351",
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
				id: "352",
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
				id: "353",
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
				id: "354",
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
				id: "355",
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
				id: "356",
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
				id: "357",
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
				id: "358",
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
				id: "359",
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
				id: "360",
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
				id: "361",
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
				id: "362",
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
				id: "363",
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
				id: "364",
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
				id: "365",
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
	}

	familyData = {
		ownerId: undefined,
		inviteCode: undefined,
		inviteLink: undefined,
		members: undefined,
		overallBalance: undefined,
		forMonth: {
			income: {
				percent: undefined,
				amount: undefined
			},
			expenses: {
				percent: undefined,
				amount: undefined
			}
		}
	}

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

	deleteNotification = () => {
		this.notification = undefined;
		this.rerenderTree();
	}
	createNewNotification = (type, text) => {
		this.notification = {
			type: type,
			text: text
		}
		this.rerenderTree();
	}
	updateFamilyData = (ownerId, inviteCode, inviteLink, members, overallBalance, forMonth) => {
		this.familyData = {
			ownerId: ownerId,
			inviteCode: inviteCode,
			inviteLink: inviteLink,
			overallBalance: overallBalance,
			members: members,
			forMonth: forMonth
		}
		this.rerenderTree();
	}
	updateUserData = (id, name, role, avatar) => {
		this.user = {
			id: id,
			role: role,
			name: name,
			avatar: avatar,
		}
		this.rerenderTree();
	}

	updateRecordsData = (recordsData) => {
		this.records = recordsData;
		this.rerenderTree();
	}

	updateCategoriesData = (costLeader, categories) => {
		this.categoriesInfo.costLeader = costLeader;
		this.categoriesInfo.categories = categories;
		this.rerenderTree();
	}

	clearAllData = () => {
		this.user = {
			id: undefined,
			role: undefined,
			name: '?'
		};
		this.records = {
			totals: {
				income: {
					sum: undefined, // "8 561 205,36 ₽"
					percent: 0 // 30
				},
				expenses: {
					sum: undefined, // "65 350 524,91 ₽"
					percent: 0
				}
			},
			recordsData: undefined
		};
		this.newRecordData = {
			type: "null",
			sum: null,
			labelSum: "",
			description: "",
			categoryId: null,
			errorText: null
		};
		this.notification = undefined;
		this.categoriesInfo = {
			costLeader: {
				id: undefined,
				value: undefined
			},
			categories: undefined
		};
		this.familyData = {
			ownerId: undefined,
			inviteCode: undefined,
			inviteLink: undefined,
			members: undefined,
			overallBalance: undefined,
			forMonth: {
				income: {
					percent: undefined,
					amount: undefined
				},
				expenses: {
					percent: undefined,
					amount: undefined
				}
			}
		};
	}
}

const store = new Store();

export default store;