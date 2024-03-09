import BackButton from "../../../components/BackBtn/BackButton";
import {Link} from "react-router-dom";
import {appRoutes} from "../../../utils/routes";
import {useUserAddressListQuery} from "../../../queries/addresses/listing";
import useAuthStore from "../../../stores/authStore";
import BottomActionSheet from "../../../components/BottomActionSheet/BottomActionSheet";
import AddressDeleteSheet from "../../../components/AddressDeleteSheet/AddressDeleteSheet";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import classes from "../../../sass/pages/address-page.module.scss";
import btnStyles from '../../../sass/components/button.module.scss'
import AddressEntry from "../../../components/AddressEntry/AddressEntry";
import clsx from "clsx";
import {Grid} from "react-loader-spinner";

export function AddressesPage() {
	const userData = useAuthStore(state => state.userData)
	const [opened, {open, close}] = useDisclosure(false)
	const {data, isLoading} = useUserAddressListQuery({id: userData.id, token: userData.token})
	const [selectedAddress, setSelectedAddress] = useState<string>('')
	return (
		<section className={classes.addresses}>
			<BackButton />
			<h1>Moje adresy</h1>
			<div>
				{isLoading && <Grid />}
				{!isLoading &&  data!.addresses.map(addr => (
					<AddressEntry key={addr._id} address={addr} setSelectedAddress={setSelectedAddress} open={open} />
				))}
			</div>
			<div className={classes.addresses__add}>
			<Link to={appRoutes.newAddress} className={clsx(btnStyles.btn, btnStyles['btn--link'])}>Dodaj adres</Link>
			</div>
			<BottomActionSheet opened={opened} close={close} withCloseButton={false} size={'35%'}>
				<AddressDeleteSheet close={close} addressId={selectedAddress} token={userData.token}/>
			</BottomActionSheet>
		</section>
	)
}