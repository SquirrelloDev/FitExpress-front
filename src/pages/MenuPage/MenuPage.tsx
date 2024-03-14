import {Tabs} from "@mantine/core";
import useAuthStore from "../../stores/authStore";
import useUserOrdersQuery from "../../queries/user/userOrders";
import {MenuView} from "../../components/MenuView/MenuView";
import MenuCalendar from "../../components/MenuCalendar/MenuCalendar";
import {useEffect, useState} from "react";
import classes from "../../sass/pages/menu-page.module.scss";
import btnStyles from '../../sass/components/button.module.scss'
import {parseIntoMidnight} from "../../utils/dates";
import {Link} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import clsx from "clsx";
import {Order} from "../../types/dbtypes/Order";

function MenuPage() {
	const userData = useAuthStore((state) => state.userData)
	const [currentDateListing, setCurrentDateListing] = useState<Date>(parseIntoMidnight(new Date()))
	const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
	const {data, isLoading, isSuccess} = useUserOrdersQuery({id: userData.id, token: userData.token})
	useEffect(() => {
		if (isSuccess){
			const activeOrders = data!.orders.filter(order => order.is_active)
			setFilteredOrders(activeOrders)
		}
	}, [data, isSuccess])
	return (
		<section className={classes.menu}>
			<h1 className={classes.menu__heading}>Menu</h1>
			{!isLoading && filteredOrders.length === 0 && (
				<div className={classes.menu__empty}>
					<h3>Nie masz żadnych aktywnych diet</h3>
					<p>Menu pojawi się w momencie kupienia diety</p>
					<Link to={appRoutes.diets} className={clsx(btnStyles.btn, btnStyles['btn--link'])}>Przejdź do diet</Link>
				</div>
			)}
			{!isLoading && filteredOrders.length > 0 && (
				<>
			<Tabs defaultValue={filteredOrders[0].name} classNames={{root: classes.menu__tabs__tab, list: classes.menu__tabs__list, tab: classes.menu__tabs__tab, panel: classes.menu__tabs_panel}}>
				<Tabs.List grow>
					{filteredOrders.map(order => <Tabs.Tab value={order.name} key={order._id}>{order.name}</Tabs.Tab>)}
				</Tabs.List>
					<MenuCalendar currentDate={new Date()} currentDateListing={currentDateListing} setCurrentDateListing={setCurrentDateListing}/>
				{filteredOrders.map(order => <MenuView currentDateListing={currentDateListing} key={order._id} order={order} token={userData.token}/>)}
			</Tabs>
				</>
			)}
		</section>
	)
}
export default MenuPage