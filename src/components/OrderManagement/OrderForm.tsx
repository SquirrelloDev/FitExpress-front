import {FormProvider, useForm} from "react-hook-form";
import Input from "../Input/Input";
import {Order} from "../../types/dbtypes/Order";
import {OrderPostData} from "../../queries/orders/create";
import OrderAddresses from "./OrderAddresses/OrderAddresses";
import {Address} from "../../types/dbtypes/Address";
import {DevTool} from "@hookform/devtools";
import useOrderEdit, {OrderClientEditSchema, OrderPutData} from "../../queries/orders/edit";
import {TailSpin} from "react-loader-spinner";
interface OrderFormProps {
	order: Order,
	addresses: Address[]
	userToken: string
}
function OrderForm({order, addresses, userToken}:OrderFormProps) {
	const methods = useForm({
		defaultValues: {name: order.name, address: order.address_id._id}
	})
	const {handleSubmit, control} = methods;
	const {mutate, isLoading, isError, error} = useOrderEdit()
	const onSubmit = (data: OrderClientEditSchema) => {
		const updatedOrder: OrderPutData = {
			order: {
				name: data.name,
				addressId: data.address,
				dietId: order.diet_id._id,
				userId: order.user_id._id,
				subDate: order.sub_date,
				price: order.price,
				calories: order.calories,
				withWeekends: order.with_weekends,
				...(order.flexi_tier && {flexiTier: order.flexi_tier})
			},
			id: order._id,
			token: userToken,
		}
		mutate(updatedOrder)
	}
	return (
		<FormProvider {...methods}>
			<h1>{order.name}</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input name={'name'} placeholder={'Nazwa diety'}/>
				<OrderAddresses allAddresses={addresses} defaultAddressId={order.address_id._id} control={control} name={'address'} isWeekend={order.with_weekends} />
				<button type={'submit'} disabled={isLoading}>{isLoading ? <TailSpin/> : 'Potwierdź zmiany'}</button>
			</form>
			<DevTool control={control}/>
		</FormProvider>
	)
}
export default OrderForm