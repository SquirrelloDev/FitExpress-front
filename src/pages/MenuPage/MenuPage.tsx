import {Tabs} from "@mantine/core";
import useAuthStore from "../../stores/authStore";
import useUserOrdersQuery from "../../queries/user/userOrders";
import {MenuView} from "../../components/MenuView/MenuView";
import MenuCalendar from "../../components/MenuCalendar/MenuCalendar";
import {useState} from "react";

function MenuPage() {
	const userData = useAuthStore((state) => state.userData)
	const [currentDateListing, setCurrentDateListing] = useState<Date>(new Date('2024-03-02'))
	const {data, isLoading} = useUserOrdersQuery({id: userData.id, token: userData.token})
	return (
		<section>
			<h1>Menu</h1>
			{!isLoading && (
				<>
			<Tabs defaultValue={data!.orders[0].name}>
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