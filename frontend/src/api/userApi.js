import axiosClient from "./axiosClient";
import Cookies from "universal-cookie";


const UserApi = {
	login: async (email, password) => {
		let resp;

		try {
			resp = await axiosClient.post("/login", {
				email: email,
				password: password
			});
		} catch (error) {
			console.log(error);
			return {
				status: false,
				msg: "Ошибка подключения к серверу. Попробуйте позже"
			};
		}

		if (resp.data) {

			if (resp.data.error === null) {
				const cookies = new Cookies();
				cookies.set("token", resp.data["access_token"]);

				return {
					status: true,
					msg: `Добро пожаловать, ${resp.data.name}!`
				};
			} else {
				return {
					status: false,
					msg: resp.data.error
				};
			}

		}
		return {
			status: false,
			msg: "Ошибка входа. Попробуйте позже"
		}
	},
	register: async (name, email, password) => {
		let resp;

		try {
			resp = await axiosClient.post("/register", {
				name: name,
				email: email,
				password: password
			});
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
				};
			} else {
				return {
					status: false,
					msg: resp.data.error
				};
			}

		}
		return {
			status: false,
			msg: "Ошибка регистрации. Попробуйте позже"
		}
	},

	getMe: async () => {
		// Обязательная проверка на наличие токена в Cookies
		const cookies = new Cookies();
		const token = cookies.get("token");
		if (!token) {
			return {
				status: false
			}
		}

		let resp;

		try {
			resp = await axiosClient.get("/get_me");
		} catch (error) {
			console.log(error);
			return {
				status: false
			}
		}

		if (resp.data) {
			return {
				status: true,
				id: resp.data.id,
				role: resp.data["family_role"],
				name: resp.data.name,
				avatar: resp.data.avatar
			};
		}

		return {
			status: false
		}
	}
}

export default UserApi;