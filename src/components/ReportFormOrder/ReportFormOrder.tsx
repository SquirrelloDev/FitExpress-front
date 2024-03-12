import {Order} from "../../types/dbtypes/Order";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {useState} from "react";
import classes from "../../sass/pages/report-create.module.scss";
import clsx from "clsx";

interface ReportFormOrders<T extends FieldValues> {
	orders: Order[],
	name: string,
	control: Control<T>
}
export function ReportFormOrders<T extends FieldValues>({name, control, orders}:ReportFormOrders<T>) {
	const [activeRadio, setActiveRadio] = useState<number>(-1);
	if(orders.length === 0) return (
		<p>Musisz posiadać zamówienie, by móc wysłać zgłoszenie</p>
	)
	return (
		<Controller name={name as Path<T>} control={control} render={({field: {onChange}}) => (
			<div className={classes.create__form__orders}>
				{orders.filter(order => order.is_active).map((order, idx) => (
					<label htmlFor={order._id} key={order._id} className={clsx(classes.create__form__orders__item, activeRadio === idx && classes['create__form__orders__item--active'])}>
						<input type={'radio'} id={order._id} name={'orders'} onClick={() => {
							onChange(order._id)
							setActiveRadio(idx)
						}}/>
						<h4>{order.name}</h4>
						<p>Dane diety:</p>
						<p>Plan diety: {order.diet_id.diet_type}</p>
						<p>Typ diety: {order.diet_id.name}</p>
						<p>Kaloryczność: {order.calories} kcal</p>
						<p>Okres trwania planu:</p>
						<p>{new Date(order.sub_date.from).toLocaleDateString()} - {new Date(order.sub_date.to).toLocaleDateString()}</p>
						<p>Adres:</p>
						{!order.address_id && <p>Brak adresu</p>}
						{order.address_id && <p>{order.address_id.street} {order.address_id.building_no}{order.address_id.apartment_no ? `/${order.address_id.apartment_no}` : ''}, {order.address_id.postal} {order.address_id.city}</p>}
					</label>
				))}
			</div>
		)}/>
	)
}