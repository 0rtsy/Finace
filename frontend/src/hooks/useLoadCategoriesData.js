import {useNavigate} from "react-router";
import {useCallback, useEffect} from "react";
import categoriesApi from "../api/categoriesApi";


export default function useLoadCategoriesData(updateCategoriesData, forceLoad = true) {
	const navigate = useNavigate();


	const request = useCallback(async () => {
		const resp = await categoriesApi.getInfo();
		if (!resp.status) {
			// navigate("/", {replace: true});
		} else {
			updateCategoriesData(
				resp.costLeader,
				resp.categories
			);
		}
	}, [updateCategoriesData, navigate])


	useEffect(() => {
		if (forceLoad) {
			request().catch(error => {
				console.error("Unhandled error:", error);
			});
		}
	}, [request, forceLoad]);

	return request;
}