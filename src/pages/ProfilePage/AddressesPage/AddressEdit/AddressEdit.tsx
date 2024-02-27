import useAuthStore from "../../../../stores/authStore";
import {useOneAddressListQuery} from "../../../../queries/addresses/listing";
import {useParams} from "react-router-dom";
import AddressEditForm from "./AddressEditForm";
// import {IconCurrentLocation} from "@tabler/icons-react";

export default function AddressEdit() {
    const userData = useAuthStore(state => state.userData)
    const params = useParams();
    const {data, isLoading} = useOneAddressListQuery({id: params.id!, token: userData.token})
    return (
        <>
            {!isLoading && <AddressEditForm addressData={data!.address} userData={userData}/>}
        </>
    )
}