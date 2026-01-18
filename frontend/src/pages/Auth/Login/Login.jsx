import "./Login.css"
import {Link} from "react-router";
import {ReactComponent as EmailIcon} from "../../../assets/icons/email.svg";
import {ReactComponent as LockIcon} from "../../../assets/icons/lock.svg";
import {ReactComponent as ArrowIcon} from "../../../assets/icons/keyboard_arrow_down.svg";


function Login({ isFrontWindow, setFrontWindow }) {
	return (
		<div className="login-container">
			<header className="login-title">Вход</header>
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
			<div className="login-button" onClick={() => {setFrontWindow(!isFrontWindow)}}>Войти</div>
			<Link to="/?tab=register" className="register-button">
				Регистрация
				<ArrowIcon className="icon"/>
			</Link>
			<Link to="/app">Продолжить без входа</Link>
		</div>
	)
}

export default Login;