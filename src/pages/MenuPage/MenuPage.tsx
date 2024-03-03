import {Tabs} from "@mantine/core";
import useAuthStore from "../../stores/authStore";
import useUserOrdersQuery from "../../queries/user/userOrders";
import {MenuView} from "../../components/MenuView/MenuView";
import MenuCalendar from "../../components/MenuCalendar/MenuCalendar";
import {useState} from "react";
import classes from "../../sass/pages/menu-page.module.scss";

function MenuPage() {
	const userData = useAuthStore((state) => state.userData)
	const [currentDateListing, setCurrentDateListing] = useState<Date>(new Date())
	const {data, isLoading} = useUserOrdersQuery({id: userData.id, token: userData.token})
	return (
		<section className={classes.menu}>
			<h1 className={classes.menu__heading}>Menu</h1>
			{!isLoading && (
				<>
			<Tabs defaultValue={data!.orders[0].name} classNames={{root: classes.menu__tabs__tab, list: classes.menu__tabs__list, tab: classes.menu__tabs__tab, panel: classes.menu__tabs_panel}}>
				<Tabs.List grow>
					{data!.orders.map(order => <Tabs.Tab value={order.name} key={order._id}>{order.name}</Tabs.Tab>)}
				</Tabs.List>
					<MenuCalendar currentDate={new Date()} currentDateListing={currentDateListing} setCurrentDateListing={setCurrentDateListing}/>
				{data!.orders.map(order => <MenuView currentDateListing={currentDateListing} key={order._id} order={order} token={userData.token}/>)}
			</Tabs>
				</>
			)}
		</section>
	)
}
export default MenuPage