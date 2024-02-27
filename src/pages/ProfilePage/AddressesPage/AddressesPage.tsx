import BackButton from "../../../components/BackBtn/BackButton";
import {Link} from "react-router-dom";
import {appRoutes} from "../../../utils/routes";
import {useUserAddressListQuery} from "../../../queries/addresses/listing";
import useAuthStore from "../../../stores/authStore";
import Card from "../../../components/Card/Card";
import {Pill} from "@mantine/core";
import {IconCheck, IconEdit, IconTrashX} from "@tabler/icons-react";
import BottomActionSheet from "../../../components/BottomActionSheet/BottomActionSheet";
import AddressDeleteSheet from "../../../components/AddressDeleteSheet/AddressDeleteSheet";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";

export function AddressesPage() {
	const userData = useAuthStore(state => state.userData)
	const [opened, {open, close}] = useDisclosure(false)
	const {data, isLoading} = useUserAddressListQuery({id: userData.id, token: userData.token})
	const [selectedAddress, setSelectedAddress] = useState<string>('')
	return (
		<section>
			<BackButton />
			<h1>Moje adresy</h1>
			<div>
				{!isLoading &&  data!.addresses.map(addr => (
					<Card key={addr._id}>
						<div>
							<div>
							<div>{addr.is_weekend && <Pill>Weekendy</Pill>}</div>
							<p>{addr.street} {addr.building_no}{addr.apartment_no ? `/${addr.apartment_no}` : ''}</p>
							<p>{addr.postal}, {addr.city}</p>
							<p>Woj. {addr.voivodeship}</p>
							</div>
							<div>
								<Link to={`edit/${addr._id}`}><IconEdit/></Link>
								<button onClick={() => {
									setSelectedAddress(addr._id)
									open()
								}}><IconTrashX/></button>
							</div>
						</div>
					</Card>
				))}
			</div>
			<Link to={appRoutes.newAddress}>Dodaj adres</Link>
			<BottomActionSheet opened={opened} close={close} withCloseButton={false} size={'35%'}>
				<AddressDeleteSheet close={close} addressId={selectedAddress} token={userData.token}/>
			</BottomActionSheet>
		</section>
	)
}