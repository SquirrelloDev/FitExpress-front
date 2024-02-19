import {useCallback, useState} from "react";
import OrderEntry from "../../components/OrderManagement/OrderEntry";
import useUserOrdersQuery from "../../queries/user/userOrders";
import useAuthStore from "../../stores/authStore";
import {Grid} from "react-loader-spinner";
import classes from "../../sass/pages/order-manage.module.scss";

function OrderManagementPage() {
	const [openedItem, setOpenedItem] = useState<number>(-1);
	const selectItem = useCallback((idx: number) => {
		setOpenedItem(prevState => {
			if(prevState === idx){
				return -1;
			}
			return idx
		})
	}, [])
	const userData = useAuthStore(state => state.userData)
	const {data, isLoading, isSuccess, error, isError} = useUserOrdersQuery({id: userData.id, token: userData.token})
	return (
		<section className={classes.management}>
			<h1>Moje diety</h1>
			<div className={classes.management__container}>
				{isLoading && <Grid/>}
				{!isLoading && data?.orders.map((order, idx) => <OrderEntry order={order} index={idx} openedItem={openedItem} setOpenedItem={selectItem} key={order._id}/>)}
			</div>
		</section>
	)
}
export default OrderManagementPage