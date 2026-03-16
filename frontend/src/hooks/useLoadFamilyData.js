import {useNavigate} from "react-router";
import familyApi from "../api/familyApi";
import {useCallback, useEffect} from "react";


// Проверка на наличие семьи, получение и обновление её данных
export default function useLoadFamilyData(updateFamilyData, forceLoad = true) {
	const navigate = useNavigate();


	const request = useCallback(async () => {
		const resp = await familyApi.getInfo();
		if (!resp.status) {
			navigate("/family", {replace: true});
		} else {
			updateFamilyData(
				resp.ownerId,
				resp.inviteCode,
				resp.inviteLink,
				resp.members,
				resp.overallBalance,
				resp.forMonth
			);
		}
	}, [updateFamilyData, navigate])


	useEffect(() => {
		if (forceLoad) {
			request().catch(error => {
				console.error("Unhandled error:", error);
			});
		}
	}, [request, forceLoad]);

	return request;
}