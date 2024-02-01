import {Outlet, useNavigate} from "react-router-dom";
import Navigation from "../components/Nav/Navigation";
import {UserRole} from "../utils/userRoles";
import {appRoutes} from "../utils/routes";
import {useEffect} from "react";
import useUserRole from "../hooks/useUserRole";
interface AppLayoutProps {
	minPermLevel: UserRole
}
export function AppLayout({minPermLevel}:AppLayoutProps) {
	const navigate = useNavigate()
	const {isAuthorized, isLoggedIn} = useUserRole(minPermLevel)
	useEffect(() => {
		if(!isLoggedIn){
			navigate(appRoutes.welcomePage);
		}
		else if(isLoggedIn && !isAuthorized){
			navigate(appRoutes.notAuthorized)
		}
	}, [isAuthorized, isLoggedIn, navigate]);
	return (
		<main>
			<Outlet/>
			<Navigation/>
		</main>
	)
}