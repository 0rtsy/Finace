import "./Login.css"
import {Link, useNavigate} from "react-router";
import {ReactComponent as EmailIcon} from "../../../assets/icons/email.svg";
import {ReactComponent as LockIcon} from "../../../assets/icons/lock.svg";
import {ReactComponent as ArrowIcon} from "../../../assets/icons/keyboard_arrow_down.svg";
import userApi from "../../../api/userApi";
import {useState} from "react";


function Login({ setFrontWindow, setFrontWindowData }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogging, setIsLogging] = useState(false);
	const [isEmailError, setEmailError] = useState(false);
	const [isPasswordError, setPasswordError] = useState(false);
	const [loginButtonText, setLoginButtonText] = useState("Войти");
	const navigate = useNavigate();


	const Validation = (fromLoginButton = false) => {
		if (isLogging || fromLoginButton) {
			setEmailError(false);
			setPasswordError(false);

			if (email.length < 5) {
				setEmailError(true);
				return false;

			} else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
				setEmailError(true);
				return false;

			} else if (password.length < 6) {
				setPasswordError(true);
				return false;

			} else { return true; }

		} else { return false; }
	}

	const Login = async () => {
		setIsLogging(true);
		setLoginButtonText("Загрузка...");

		if (Validation(true)) {
			const answer = await userApi.login(email, password);

			if (!answer.status) {
				setFrontWindowData({ title: "Ошибка входа в аккаунт", description: answer.msg });
				setFrontWindow(true);
				setLoginButtonText("Войти");
			} else {
				setLoginButtonText("Успешно!");
				navigate("/family");
			}
		} else {
			setLoginButtonText("Войти")
		}
	}

	return (
		<div className="login-container">
			<header className="login-title">Вход</header>
			<div className={`input-field email${isEmailError ? ' error' : ''}`}>
				<div className="label">
					<EmailIcon className="icon"/>
				</div>
				<input
					type="email"
					placeholder="Электронная почта"
					onChange={(e) => {
						setEmail(e.target.value);
						Validation();
					}}
				/>
			</div>
			<div className={`input-field password${isPasswordError ? ' error' : ''}`}>
				<div className="label">
					<LockIcon className="icon"/>
				</div>
				<input
					type="password"
					placeholder="Пароль"
					onChange={(e) => {
						setPassword(e.target.value);
						Validation();
					}}
				/>
			</div>
			<div className="login-button" onClick={() => Login()}>{loginButtonText}</div>
			<Link to="/?tab=register" className="register-button">
				Регистрация
				<ArrowIcon className="icon"/>
			</Link>
			<Link to="/app">Продолжить без входа</Link>
		</div>
	)
}

export default Login;