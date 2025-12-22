import { Link } from "react-router";
import "./Login.css";


function Login() {
	return (
		<div className="login-container">
			<Link to="/app" className="button">Войти</Link>
		</div>
	)
}

export default Login;