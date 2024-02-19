import {useCallback, useEffect, useState} from "react";
import OrderEntry from "../../components/OrderManagement/OrderEntry";
import useUserOrdersQuery from "../../queries/user/userOrders";
import useAuthStore from "../../stores/authStore";
import {Grid} from "react-loader-spinner";
import classes from "../../sass/pages/order-manage.module.scss";
import ManagementControl from "../../components/OrderManagement/ManagementControls";
import {Order} from "../../types/dbtypes/Order";

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
    const [filteredArr, setFilteredArr] = useState<Order[]>([])
    useEffect(() =>{
        if(isSuccess){
            setFilteredArr(data!.orders)
        }
    }, [data, isSuccess])
	const filterItems = useCallback((arg: string) => {
		switch (arg) {
			case 'all':
				setFilteredArr(data!.orders)
				break;
			case 'active':
				setFilteredArr(data!.orders.filter(order => order.is_active))
				break;
			case 'deactive':
				setFilteredArr(data!.orders.filter(order => !order.is_active))
				break;
			default:
				setFilteredArr(data!.orders)
		}
	}, [data])
	return (
		<section className={classes.management}>
			<h1>Moje diety</h1>
			<div className={classes.management__container}>
				{isLoading && <Grid/>}
				{!isLoading && (
					<>
					<ManagementControl filterFunction={filterItems}/>
					{filteredArr.length === 0 && <p>Coś tu pusto...</p>}
					{filteredArr.map((order, idx) => <OrderEntry token={userData.token} order={order} index={idx} openedItem={openedItem} setOpenedItem={selectItem} key={order._id}/>)}
					</>
				) }
			</div>
		</section>
	)
}
export default OrderManagementPage