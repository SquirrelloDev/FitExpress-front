import BackButton from "../../../components/BackBtn/BackButton";
import {Link} from "react-router-dom";
import {appRoutes} from "../../../utils/routes";
import {useUserAddressListQuery} from "../../../queries/addresses/listing";
import useAuthStore from "../../../stores/authStore";
import Card from "../../../components/Card/Card";
import {Pill} from "@mantine/core";
import {IconCheck, IconEdit, IconTrashX} from "@tabler/icons-react";

export function AddressesPage() {
	const userData = useAuthStore(state => state.userData)
	const {data, isLoading} = useUserAddressListQuery({id: userData.id, token: userData.token})
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
								<button><IconTrashX/></button>
							</div>
						</div>
					</Card>
				))}
			</div>
			<Link to={appRoutes.newAddress}>Dodaj adres</Link>
		</section>
	)
}