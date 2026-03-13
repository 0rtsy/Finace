import "./Auth.css";
import {useNavigate, useSearchParams} from "react-router";
import {ReactComponent as ErrorIcon} from "../../assets/icons/error.svg";
import Login from "./Login/Login";
import Register from "./Register/Register";
import {useEffect, useState} from "react";
import userApi from "../../api/userApi";


export const useAuthRedirect = () => {
	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true;

		const checkAuth = async () => {
			const answer = await userApi.getMe();
			if (isMounted && answer.status) {
				navigate("/family", {replace: true});
			}
		}

		checkAuth().catch(error => {
			console.error("Unhandled error in checkAuth:", error);
		});

		return () => {
			isMounted = false;
		};
	}, [navigate]);
};


function Auth() {
	const [isFrontWindow, setFrontWindow] = useState(false);
	const [frontWindowData, setFrontWindowData] = useState({
		title: "",
		description: ""
	});
	const [searchParam] = useSearchParams();
	const tab = searchParam.get("tab") || "";

	useAuthRedirect();

	useEffect(() => {



	}, []);



	return (
		<>
			<div className="auth-container">
				<header className="auth-title">
					<img src="/images/coin.png" alt="" width={167} height={167} />
					<img src="/images/stat.png" alt="" width={148} height={148} />
					<div className="transition"></div>
				</header>
				<div className="content">
					<div className={`wrapper ${tab}`}>
						<div className="auth-slide login">
							<Login
								setFrontWindow={setFrontWindow}
								setFrontWindowData={setFrontWindowData}
							/>
						</div>
						<div className="auth-slide register">
							<Register
								setFrontWindow={setFrontWindow}
								setFrontWindowData={setFrontWindowData}
							/>
						</div>
					</div>
				</div>

			</div>
			<div className={`front-info-window ${isFrontWindow ? '' : 'hidden'}`}>
				<div className="info-container">
					<div className="icon-container">
						<ErrorIcon className="icon"/>
					</div>
					<div className="text-container">
						<div className="title">{frontWindowData.title}</div>
						{frontWindowData.description}
					</div>
					<div className="ok-button" onClick={() => {setFrontWindow(false)}}>Закрыть</div>
				</div>
			</div>
		</>
	)
}

export default Auth;