import {useParams} from "react-router-dom";
import {useOneOrderListQuery} from "../../queries/orders/listing";
import useAuthStore from "../../stores/authStore";
import {Grid} from "react-loader-spinner";
import OrderForm from "../../components/OrderManagement/OrderForm";
import {useUserAddressListQuery} from "../../queries/addresses/listing";

function OrderEdit() {
    const params = useParams()
    const userData = useAuthStore((state) => state.userData)
    const dietId = params.dietId
    const {data, isLoading} = useOneOrderListQuery({id: dietId!, token: userData.token})
    const {data: userAddresses, isLoading: isAddressLoading} = useUserAddressListQuery({id: userData.id, token: userData.token})
    return (
        <>
            {(isLoading || isAddressLoading) && <Grid/>}
            {(!isLoading && !isAddressLoading) && (
                <OrderForm order={data?.order} addresses={userAddresses!.addresses} userToken={userData.token}/>
            )}
        </>
    )
}

export default OrderEdit