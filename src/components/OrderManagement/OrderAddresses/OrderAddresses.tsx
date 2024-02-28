import {Address} from "../../../types/dbtypes/Address";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {useEffect, useState} from "react";
import classes from "../../../sass/components/order-form.module.scss";
import clsx from "clsx";

interface OrderAddressesProps<T extends FieldValues> {
	allAddresses: Address[]
	defaultAddressId: string | null
	control: Control<T>
	name: string
	isWeekend: boolean
}
function OrderAddresses<T extends FieldValues>({allAddresses, defaultAddressId, control, name, isWeekend}:OrderAddressesProps<T>) {
	const [activeRadio, setActiveRadio] = useState<number>(-1);
	const filteredAddresses = isWeekend ? allAddresses.filter(addr => addr.is_weekend === isWeekend) : allAddresses
	useEffect(() => {
		setActiveRadio(filteredAddresses.findIndex(addr => addr._id === defaultAddressId))
	}, [defaultAddressId, filteredAddresses])
	return (
		<Controller control={control} name={name as Path<T>}
		render={({field: {onChange}}) => (
			<div>
				<h3>Adres dostawy</h3>
				<div className={classes.form__address__container}>
					{filteredAddresses.map((address,idx) => (
						<label key={address._id} className={clsx(classes.form__address__item, activeRadio === idx && classes['form__address__item--active'])}>
							<input type={'radio'} id={address._id} name={'address'} onClick={() => {
								onChange(address._id)
								setActiveRadio(idx)
							}}
							defaultChecked={allAddresses.some(addr => addr._id === defaultAddressId)}
							/>
							<div>
								<h4>{`Adres ${idx + 1}`}</h4>
								<p>{`${address.street} ${address.building_no} ${address.apartment_no ? address.apartment_no : ''}`}</p>
								<p>{`${address.postal}, ${address.city}`}</p>
							</div>
						</label>
					))}
				</div>
			</div>
		)}
		/>

	)
}
export default OrderAddresses