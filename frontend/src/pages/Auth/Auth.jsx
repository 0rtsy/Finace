import "./Auth.css";
import {useSearchParams} from "react-router";
import {ReactComponent as ErrorIcon} from "../../assets/icons/error.svg";
import Login from "./Login/Login";
import Register from "./Register/Register";
import {useState} from "react";


function Auth() {
	const [isFrontWindow, setFrontWindow] = useState(false);
	const [searchParam] = useSearchParams();
	const tab = searchParam.get("tab") || "";

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
							<Login isFrontWindow={isFrontWindow} setFrontWindow={setFrontWindow} />
						</div>
						<div className="auth-slide register">
							<Register isFrontWindow={isFrontWindow} setFrontWindow={setFrontWindow} />
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
						<div className="title">Ошибка входа в аккаунт</div>
						Неверный логин или пароль. Попробуйте снова
					</div>
					<div className="ok-button" onClick={() => {setFrontWindow(false)}}>Закрыть</div>
				</div>
			</div>
		</>
	)
}

export default Auth;