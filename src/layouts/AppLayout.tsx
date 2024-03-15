import {Outlet, useNavigate} from "react-router-dom";
import Navigation from "../components/Nav/Navigation";
import {UserRole} from "../utils/userRoles";
import {appRoutes} from "../utils/routes";
import {useEffect} from "react";
import useUserRole from "../hooks/useUserRole";
import layoutStyles from '../sass/layouts/main.module.scss'
import useOnlineStatus from "../hooks/useOnlineStatus";
import DesktopNav from "../components/Nav/DesktopNav";
interface AppLayoutProps {
	minPermLevel: UserRole
}
export function AppLayout({minPermLevel}:AppLayoutProps) {
	const navigate = useNavigate()
	const {isAuthorized, isLoggedIn} = useUserRole(minPermLevel)
	const isAppOnline = useOnlineStatus()
	useEffect(() => {
		isAppOnline()
	}, [isAppOnline])
	useEffect(() => {
		if(!isLoggedIn){
			navigate(appRoutes.welcomePage);
		}
		else if(isLoggedIn && !isAuthorized){
			navigate(appRoutes.notAuthorized)
		}
	}, [isAuthorized, isLoggedIn, navigate]);
	return (
		<main className={layoutStyles.app}>
			<DesktopNav/>
			<Outlet/>
			<Navigation/>
		</main>
	)
}