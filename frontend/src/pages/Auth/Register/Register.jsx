import {Link, useNavigate} from "react-router";
import "./Register.css"
import {ReactComponent as UserIcon} from "../../../assets/icons/user.svg";
import {ReactComponent as EmailIcon} from "../../../assets/icons/email.svg";
import {ReactComponent as LockIcon} from "../../../assets/icons/lock.svg";
import {ReactComponent as ArrowIcon} from "../../../assets/icons/keyboard_arrow_down.svg";
import {useState} from "react";
import userApi from "../../../api/userApi";


function Register({ setFrontWindow, setFrontWindowData }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogging, setIsLogging] = useState(false);
	const [isNameError, setNameError] = useState(false);
	const [isEmailError, setEmailError] = useState(false);
	const [isPasswordError, setPasswordError] = useState(false);
	const [registerButtonText, setRegisterButtonText] = useState("Регистрация");
	const navigate = useNavigate();


	const Validation = (fromRegisterButton = false) => {
		if (isLogging || fromRegisterButton) {
			setNameError(false);
			setEmailError(false);
			setPasswordError(false);

			if (name.length < 2) {
				setNameError(true);
				return false;
			}else if (email.length < 5) {
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

	const Registration = async () => {
		setIsLogging(true);
		setRegisterButtonText("Загрузка...");

		if (Validation(true)) {
			const answer = await userApi.register(name, email, password);

			if (!answer.status) {
				setFrontWindowData({ title: "Ошибка регистрации аккаунта", description: answer.msg });
				setFrontWindow(true);
				setRegisterButtonText("Регистрация");
			} else {
				setRegisterButtonText("Вход...");
				const answer = await userApi.login(email, password);

				if (!answer.status) {
					setFrontWindowData({ title: "Ошибка входа в аккаунт", description: "Что-то пошло не так... Попробуйте позже" });
					setFrontWindow(true);
					setRegisterButtonText("Регистрация");
				} else {
					setRegisterButtonText("Успешно!");
					navigate("/family");
				}
			}
		} else {
			setRegisterButtonText("Регистрация");
		}
	}

	return (
		<div className="register-container">
			<header className="register-title">Регистрация</header>
			<div className={`input-field name${isNameError ? ' error' : ''}`}>
				<div className="label">
					<UserIcon className="icon"/>
				</div>
				<input
					type="text"
					placeholder="Имя"
					onChange={(e) => {
						setName(e.target.value);
						Validation();
					}}
				/>
			</div>
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
			<div className="register-button" onClick={() => Registration()}>{registerButtonText}</div>
			<Link to="/" className="login-button">
				<ArrowIcon className="icon"/>
				Вход
			</Link>
			<Link to="/app">Продолжить без входа</Link>
		</div>
	)
}

export default Register;