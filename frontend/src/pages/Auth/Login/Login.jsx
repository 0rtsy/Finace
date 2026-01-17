import "./Login.css"
import {Link} from "react-router";
import {ReactComponent as EmailIcon} from "../../../assets/icons/email.svg";
import {ReactComponent as LockIcon} from "../../../assets/icons/lock.svg";


function Login({ isFrontWindow, setFrontWindow }) {
	return (
		<div className="login-container">
			<header className="title">
				<div className="content">
					Семейный бюджет
					<span id="description">Ваш финансовый помощник</span>
				</div>
			</header>
			<div className="login-form">
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
				<Link to="/?tab=register" className="register-button">Зарегистрироваться</Link>
				<Link to="/app">Продолжить без входа</Link>
			</div>
		</div>
	)
}

export default Login;