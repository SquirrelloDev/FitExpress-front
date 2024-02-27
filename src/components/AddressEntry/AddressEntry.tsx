import Card from "../Card/Card";
import {Pill} from "@mantine/core";
import {Link} from "react-router-dom";
import {IconEdit, IconTrashX} from "@tabler/icons-react";
import {Address} from "../../types/dbtypes/Address";
import React, {Dispatch, SetStateAction} from "react";
interface AddressEntryProps {
	address: Address
	setSelectedAddress: Dispatch<SetStateAction<string>>
	open: () => void
}
function AddressEntry({address, setSelectedAddress, open}:AddressEntryProps) {
	console.log('render address entry')
	return (
		<Card>
			<div>
				<div>
					<div>{address.is_weekend && <Pill>Weekendy</Pill>}</div>
					<p>{address.street} {address.building_no}{address.apartment_no ? `/${address.apartment_no}` : ''}</p>
					<p>{address.postal}, {address.city}</p>
					<p>Woj. {address.voivodeship}</p>
				</div>
				<div>
					<Link to={`edit/${address._id}`}><IconEdit/></Link>
					<button onClick={() => {
						setSelectedAddress(address._id)
						open()
					}}><IconTrashX/></button>
				</div>
			</div>
		</Card>
	)
}
export default React.memo(AddressEntry);