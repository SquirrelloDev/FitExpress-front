import {Link, useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import btnStyles from '../../sass/components/button.module.scss'
import clsx from "clsx";
import classes from "../../sass/pages/profile.module.scss";
import {IconClipboardData, IconDiscount2, IconLogout, IconMapPin, IconMessageReport} from "@tabler/icons-react";
import useAuthStore from "../../stores/authStore";
import PushCta from "../../components/PWA-Componets/Push/PushCta";
import {useMediaQuery} from "@mantine/hooks";

function ProfilePage() {
	const navigate = useNavigate()
	const logout = useAuthStore(state => state.logout)
	const matches = useMediaQuery('(display-mode: standalone)');
	const logOut = () => {
		logout();
		navigate(appRoutes.welcomePage)
	}
	return (
		<section className={classes.profile}>
			<h1>Mój profil</h1>
			<div className={classes.profile__wrapper}>
			<div className={classes.profile__nav}>
				{matches && <PushCta/>}
				<Link to={appRoutes.profileDetails} className={clsx(btnStyles.btn, btnStyles['btn--dark'], classes.profile__nav__item)}><IconClipboardData/> Moje dane</Link>
				<Link to={appRoutes.addresses} className={clsx(btnStyles.btn, btnStyles['btn--dark'], classes.profile__nav__item)}><IconMapPin/> Adresy</Link>
				<Link to={appRoutes.vouchers} className={clsx(btnStyles.btn, btnStyles['btn--dark'], classes.profile__nav__item)}><IconDiscount2/> Vouchery</Link>
				<Link to={appRoutes.reports} className={clsx(btnStyles.btn, btnStyles['btn--dark'], classes.profile__nav__item)}><IconMessageReport />Zgłoszenia</Link>
				<button onClick={logOut} className={clsx(btnStyles.btn, btnStyles['btn--outline'],  btnStyles['btn--outline--danger'], classes.profile__nav__item)}><IconLogout /> Wyloguj się</button>
			</div>
			</div>
		</section>
	)
}
export default ProfilePage