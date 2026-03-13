import axiosClient from "./axiosClient";


const RecordsApi = {
	createNewRecord: async (type, amount, description, categoryId) => {
		let resp;

		try {
			resp = await axiosClient.post(`/records/create`, {
				"type": type,
				"sum": amount,
				"description": description,
				"category_id": categoryId,
			})
		} catch (error) {
			console.log(error)
			return {
				status: false,
				msg: "Ошибка подключения к серверу. Попробуйте позже"
			}
		}

		if (resp.data) {
			if (resp.data.error !== null) {
				return {
					status: false,
					msg: resp.data.error
				}
			}
			return {status: true}
		}

		return {
			status: false,
			msg: "Ошибка создания новой записи. Попробуйте позже"
		};
	},

	loadAllRecords: async () => {
		let resp;

		try {
			resp = await axiosClient.get(`/records/get_all`);
		} catch (error) {
			console.log(error);
			return {
				status: false,
				do: 0 // Unknown
			}
		}

		if (resp.data.status === 400) {
			return {
				status: false,
				do: 1 // Redirect to create family page
			}
		}
		return {
			status: true,
			do: 0,
			data: {
				totals: resp.data.totals,
				recordsData: resp.data.recordsData
			}
		}
	}
}
export default RecordsApi;