import classes from "../../sass/components/nav.module.scss";
import {NavLink} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import clsx from "clsx";
import {IconBriefcase, IconHeart, IconHome, IconNotes, IconUser} from "@tabler/icons-react";

function DesktopNav() {
	return (
		<nav className={classes.desktop}>
			<div>
				<h1>FitExpress</h1>
			</div>
			<div className={classes.desktop__links}>
			<NavLink to={appRoutes.home} className={({isActive}) => clsx(classes.desktop__links__link, isActive && classes['desktop__links__link--active'])}><IconHome/><p>Główna</p></NavLink>
			<NavLink to={appRoutes.menu} className={({isActive}) => clsx(classes.desktop__links__link, isActive && classes['desktop__links__link--active'])}><IconNotes/><p>Menu</p></NavLink>
			<NavLink to={appRoutes.dietManagement} className={({isActive}) => clsx(classes.desktop__links__link, isActive && classes['desktop__links__link--active'])}><IconBriefcase/><p>Plany</p></NavLink>
			<NavLink to={appRoutes.healthPage} className={({isActive}) => clsx(classes.desktop__links__link, isActive && classes['desktop__links__link--active'])}><IconHeart/><p>Zdrowie</p></NavLink>
			<NavLink to={appRoutes.profile} className={({isActive}) => clsx(classes.desktop__links__link, isActive && classes['desktop__links__link--active'])}><IconUser/><p>Profil</p></NavLink>
			</div>
		</nav>
	)
}
export default DesktopNav