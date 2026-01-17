import {Link} from "react-router";
import "./Register.css"
import {ReactComponent as UserIcon} from "../../../assets/icons/user.svg";
import {ReactComponent as EmailIcon} from "../../../assets/icons/email.svg";
import {ReactComponent as LockIcon} from "../../../assets/icons/lock.svg";


function Register({ isFrontWindow, setFrontWindow }) {
	return (
		<div className="register-container">
			<header className="title">
				<div className="content">
					Семейный бюджет
					<span id="description">Ваш финансовый помощник</span>
				</div>
			</header>
			<div className="login-form">
				<header className="login-title">Регистрация</header>
				<div className="input-field name">
					<div className="label">
						<UserIcon className="icon"/>
					</div>
					<input type="text" placeholder="Имя"/>
				</div>
				<div className="input-field email">
					<div className="label">
						<EmailIcon className="icon"/>
					</div>
					<input type="email" placeholder="Электронная почта"/>
				</div>
				<div className="input-field password">
					<div className="label">
						<LockIcon className="icon"/>
					</div>
					<input type="password" placeholder="Пароль"/>
				</div>
				<div className="register-button" onClick={() => {setFrontWindow(!isFrontWindow)}}>Регистрация</div>
				<Link to="/" className="login-button">Вход</Link>
				<Link to="/app">Продолжить без входа</Link>
			</div>
		</div>
	)
}

export default Register;