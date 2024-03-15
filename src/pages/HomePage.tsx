import NoOrders from "../layouts/homepage/NoOrders";
import classes from "../sass/pages/home.module.scss";
import StandardLayout from "../layouts/homepage/StandardLayout";
import useAuthStore from "../stores/authStore";
import useUserOrdersQuery from "../queries/user/userOrders";
import {Grid} from "react-loader-spinner";

function HomePage() {
	const userData = useAuthStore((state) => state.userData)
	const {data, isLoading} = useUserOrdersQuery({id: userData.id, token: userData.token})
	const currentDate = new Date();
	const intlDate = new Intl.DateTimeFormat("pl-PL", {
		year: "numeric",
		month: "long",
		day: "numeric"
	}).format(currentDate)
	return (
		<div className={classes.home}>
			<h1>Cześć {userData.name.split(' ')[0]}</h1>
			<h4>Dzisiaj {intlDate}</h4>
			{isLoading && <Grid />}
			<div>
			{!isLoading && data!.orders.length > 0 && <StandardLayout orderData={data!.orders}/>}
			{!isLoading && data!.orders.length === 0 && <NoOrders/>}
			</div>
		</div>
	)
}
export default HomePage;