import {Address} from "../../../types/dbtypes/Address";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {useState} from "react";

interface OrderAddressesProps<T extends FieldValues> {
	allAddresses: Address[]
	defaultAddressId: string
	control: Control<T>
	name: string
	isWeekend: boolean
}
function OrderAddresses<T extends FieldValues>({allAddresses, defaultAddressId, control, name, isWeekend}:OrderAddressesProps<T>) {
	const [activeRadio, setActiveRadio] = useState<number>(-1);
	const filteredAddresses = isWeekend ? allAddresses.filter(addr => addr.is_weekend === isWeekend) : allAddresses
	return (
		<Controller control={control} name={name as Path<T>}
		render={({field: {onChange}}) => (
			<div>
				<h3>Adres dostawy</h3>
				<div>
					{filteredAddresses.map((address,idx) => (
						<label key={address._id}>
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
								<p>{address.isDefault && 'Domyślny adres'}</p>
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