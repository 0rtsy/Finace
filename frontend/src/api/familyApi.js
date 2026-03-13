import axiosClient from "./axiosClient";


const FamilyApi = {
	createMyFamily: async () => {
		let resp;

		try {
			resp = await axiosClient.post("/families/create")
		} catch (error) {
			console.log(error);
			return {
				status: false,
				msg: "Ошибка подключения к серверу. Попробуйте позже"
			};
		}

		if (resp.data) {
			if (resp.data.error === null) {
				return {
					status: true,
					msg: null
				}
			} else {
				return {
					status: false,
					msg: resp.data.error
				}
			}
		}

		return {
			status: false,
			msg: "Ошибка создания семьи. Попробуйте позже"
		}
	},

	getInfo: async () => {
		let resp;

		try {
			resp = await axiosClient.get("/families/get_info");
		} catch (error) {
			console.log(error);
			return {
				status: false
			}
		}

		if (resp.data) {
			if (resp.data.status === 200) {
				return {
					status: true,
					members: resp.data.data,
					ownerId: resp.data["owner_id"],
					inviteCode: resp.data["invite_code"],
					inviteLink: resp.data["invite_link"],
					overallBalance: resp.data["overall_balance"],
					forMonth: resp.data["for_month"],
				};
			}
		}

		return {
			status: false
		}
	},

	check: async (familyInviteCode) => {
		let resp;

		try {
			resp = await axiosClient.post("/families/check", {code: familyInviteCode});
		} catch (error) {
			console.log(error);
			return {
				status: false,
				msg: "Не удалось подключится к серверу. Попробуйте позже"
			};
		}
		if (!resp.data.success) {
			return {
				status: false,
				msg: "Семья не найдена"
			}
		} else {
			return {
				status: true,
				owner: resp.data.owner,
				members: resp.data.members
			}
		}
	},

	invite: async (familyInviteCode, familyRole) => {
		let resp;

		try {
			resp = await axiosClient.post("/families/invite", {
				"code": familyInviteCode,
				"family_role": familyRole
			});
		} catch (error) {
			console.log(error);
			return {
				status: false,
				do: 0,
				msg: "Не удалось подключится к серверу. Попробуйте позже"
			}
		}

		if (resp.data.status === 401) {
			return {
				status: false,
				do: 1,
				msg: "Перенаправление..."
			}
		} else if (resp.data.status === 404) {
			return {
				status: false,
				do: 0,
				msg: "Семья не найдена"
			}
		} else if (resp.data.status === 200) {
			return {
				status: true,
				do: 0,
				msg: ""
			}
		}
	}
}

export default FamilyApi;