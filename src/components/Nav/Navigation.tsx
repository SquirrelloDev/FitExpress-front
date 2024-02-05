import {NavLink} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import classes from "../../sass/components/nav.module.scss";
import clsx from "clsx";
import {IconBriefcase, IconHeart, IconHome, IconNotes, IconUser} from "@tabler/icons-react";

function Navigation() {
	return (
		<nav className={classes.nav}>
			<NavLink to={appRoutes.home} className={({isActive}) => clsx(classes.nav__link, isActive && classes['nav__link--active'])}><IconHome/><p>Główna</p></NavLink>
			<NavLink to={appRoutes.menu} className={({isActive}) => clsx(classes.nav__link, isActive && classes['nav__link--active'])}><IconNotes/><p>Menu</p></NavLink>
			<NavLink to={appRoutes.dietManagement} className={({isActive}) => clsx(classes.nav__link, isActive && classes['nav__link--active'])}><IconBriefcase/><p>Plany</p></NavLink>
			<NavLink to={appRoutes.healthPage} className={({isActive}) => clsx(classes.nav__link, isActive && classes['nav__link--active'])}><IconHeart/><p>Zdrowie</p></NavLink>
			<NavLink to={appRoutes.profile} className={({isActive}) => clsx(classes.nav__link, isActive && classes['nav__link--active'])}><IconUser/><p>Profil</p></NavLink>
		</nav>
	)
}
export default Navigation