import {useNavigate} from "react-router-dom";
import {appRoutes} from "../utils/routes";
import btnStyles from '../sass/components/button.module.scss'
import classes from "../sass/pages/not-found.module.scss";

function NotFound() {
	const navigate = useNavigate()
	const returnToSafe = () => {
		navigate(appRoutes.login)
	}
	return (
		<main className={classes.notfound}>
			<h1>404</h1>
			<p>Strona, której szukasz znajduje się gdzie indziej</p>
			<button onClick={returnToSafe} className={btnStyles.btn}>Powrót</button>
		</main>
	)
}
export default NotFound