import axiosClient from "./axiosClient";


const CategoriesApi = {
	create: async (name, iconName, color) => {
		try {
			await axiosClient.post("/categories/create", {
				"name": name,
				"icon_name": iconName,
				"color": color,
			});
		} catch (error) {
			console.log(error);
			return {
				status: false
			};
		}

		return {
			status: true
		}
	},
	getInfo: async () => {
		let resp;

		try {
			resp = await axiosClient.get("/categories/get_info");
		} catch (error) {
			console.log(error);
			return {
				status: false,
			};
		}

		return {
			status: true,
			costLeader: resp.data["cost_leader"],
			categories: resp.data.categories
		}
	},

	getCategoryData: async (categoryId) => {
		let resp;

		try {
			resp = await axiosClient.get(`/categories/get/${categoryId}`);
		} catch (error) {
			console.log(error);
			return {
				status: false,
				msg: "Не удалось загрузить информацию. Попробуйте позже"
			}
		}

		const error = resp.data.error
		if (error === 400) {
			return {
				status: false,
				msg: "Ошибка загрузки данных. Попробуйте позже"
			}
		} else if (error === 404 || error === 403) {
			return {
				status: false,
				msg: "Категория не найдена. Обновите страницу"
			}
		} else if (error == null) {
			return {
				status: true,
				creator: resp.data.creator,
				totals: resp.data.totals,
				lastestRecords: resp.data.lastestRecords
			}
		} else {
			return {
				status: false,
				msg: "Ошибка"
			}
		}
	}
}

export default CategoriesApi;