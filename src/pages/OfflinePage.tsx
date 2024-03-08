import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../utils/routes";
import {IconWifiOff} from "@tabler/icons-react";
import classes from "../sass/pages/offline-page.module.scss";

function OfflinePage() {
	const navigate = useNavigate()
	const returnOnline = () => {
		navigate(appRoutes.home)
	}
	useEffect(() => {
		window.addEventListener('online', returnOnline)
		return () => {
			window.removeEventListener('online', returnOnline)
		}
	})
	return (
		<section className={classes.offline}>
			<IconWifiOff size={100} />
			<h1>Jesteś offline</h1>
			<p>Przywróć połączenie z siecią, by móc dalej korzystać z aplikacji</p>
		</section>
	)
}
export default OfflinePage