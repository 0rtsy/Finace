import {useNavigate} from "react-router";
import {useEffect, useCallback} from "react";
import recordsApi from "../api/recordsApi";


// Загрузка и обновление данных записей (totals, recordsData) или переброс на страницу создания семьи
export default function useLoadRecordsData(updateRecordsData, forceLoad = true) {
	const navigate = useNavigate();

	const request = useCallback(async () => {
		const resp = await recordsApi.loadAllRecords();
		if (resp.status) {
			updateRecordsData(resp.data);
		} else if (resp.do === 1) {
			// navigate("/family", {replace: true});
		}
	}, [updateRecordsData, navigate]);

	useEffect(() => {
		if (forceLoad) {
			request().catch(error => {
				console.error("Unhandled error:", error);
			});
		}
	}, [forceLoad, request]);

	return request;
}