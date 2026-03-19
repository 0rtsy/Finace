import "./FamilyManager.css"
import {Link, useNavigate, useSearchParams} from "react-router";
import CreateFamily from "./CreateFamily/CreateFamily";
import InviteFamily from "./InviteFamily/InviteFamily";
import {useEffect, useState, useRef} from "react";
import familyApi from "../../api/familyApi";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";


export const useFamilyRedirect = () => {
	const navigate = useNavigate();
	const isLoad = useRef(false);

	useEffect(() => {
		let isMounted = true;

		const checkAuth = async () => {
			const answer = await familyApi.getInfo();
			if (isMounted && answer.status) {
				navigate("/app", {replace: true});
			} else if (answer.status) {
				isLoad.current = true;
			}
		}

		checkAuth().catch(error => {
			console.error("Unhandled error in checkAuth:", error);
		});

		return () => {
			isMounted = false;
		};
	}, [navigate, isLoad]);

	return isLoad;
};


function FamilyManager() {
	const [isFamilyCreating, setIsFamilyCreating] = useState(false);
	const [searchParam] = useSearchParams();
	const navigate = useNavigate();
	let tab = searchParam.get("tab") || "main";

	const isLoad = useFamilyRedirect();

	if (isFamilyCreating && tab !== "create") {
		navigate("?tab=create");
		tab = "create";
	}

	return (
		<div className="family-manager-container">
			{isLoad
				? <div className={`wrapper ${tab}`}>
					<InviteFamily/>

					<div className="fm-container selector">
						<div className="animation-container">
							<img src="/animations/family.gif" alt="Family Animation" className="animation"/>
						</div>
						<header className="title">Создайте семью и добавляйте своих родных!</header>
						<div className="buttons-container">
							<Link to="?tab=create" className="create-family">Создать семью</Link>
							<Link to="?tab=invite" className="invite-family">Присоединиться к семье</Link>
						</div>
					</div>

					<CreateFamily isFamilyCreating={isFamilyCreating} setIsFamilyCreating={setIsFamilyCreating}/>
				</div>

				: <div className="loading-family-information">
					<LoadingCircle width="70px" height="70px"/>
					Подождите...
				</div>
			}
		</div>
	)
}

export default FamilyManager;