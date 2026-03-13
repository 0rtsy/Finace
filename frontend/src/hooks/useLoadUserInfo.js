import {useNavigate} from "react-router";
import {useEffect, useCallback} from "react";
import userApi from "../api/userApi";


// Загрузка и обновление данных пользователя (id, name, role) или переброс на страницу авторизации
export default function useLoadUserInfo(updateUserData, forceLoad = true) {
	const navigate = useNavigate();

	const request = useCallback(async () => {
		const resp = await userApi.getMe();
		// Не ропускаем проверку на status == true, т.к. если токен в cookies отсутсвует, функция не будет
		// выполнять запрос
		if (!resp.status) {
			// navigate("/", {replace: true});
		} else {
			updateUserData(resp.id, resp.name, resp.role, resp.avatar);
		}
	}, [updateUserData, navigate]);

	useEffect(() => {
		if (forceLoad) {
			request().catch(error => {
				console.error("Unhandled error:", error);
			});
		}
	}, [forceLoad, request]);

	return request;
}