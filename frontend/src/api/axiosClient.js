import axios from "axios";
import Cookies from "universal-cookie";


const cookies = new Cookies();
const API_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Перехват запросов для добавления токена авторизации
axiosClient.interceptors.request.use(
	(config) => {
		const token = cookies.get("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Перехват ответов сервера для обработки ошибок
// Ошибка 401 (Unauthorized) и перебрасывание пользователя на страницу входа
axiosClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error.response?.status === 401) {
			cookies.remove('token', { path: '/' });
			window.location.href = '/';
			return;
		}

		return Promise.reject(error);
	}
);

export default axiosClient;