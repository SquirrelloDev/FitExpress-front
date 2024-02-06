import NoOrders from "../layouts/homepage/NoOrders";
import classes from "../sass/pages/home.module.scss";
import StandardLayout from "../layouts/homepage/StandardLayout";
import useAuthStore from "../stores/authStore";
import {Skeleton} from "@mantine/core";
import useUserOrdersQuery from "../queries/user/userOrders";

function HomePage() {
	const userData = useAuthStore((state) => state.userData)
	const {data, isLoading} = useUserOrdersQuery({id: userData.id, token: userData.token})
	return (
		<div className={classes.home}>
			<h1>Cześć {userData.name.split(' ')[0]}</h1>
			{isLoading && <Skeleton />}
			{!isLoading && data?.orders.length > 0 && <StandardLayout orderData={data!.orders}/>}
			{!isLoading && data?.orders.length === 0 && <NoOrders/>}
		</div>
	)
}
export default HomePage;