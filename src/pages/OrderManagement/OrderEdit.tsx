import {useParams} from "react-router-dom";
import {useOneOrderListQuery} from "../../queries/orders/listing";
import useAuthStore from "../../stores/authStore";
import {Grid} from "react-loader-spinner";
import OrderForm from "../../components/OrderManagement/OrderForm";
import {useUserAddressListQuery} from "../../queries/addresses/listing";
import {Alert} from "@mantine/core";
import alertStyles from "../../sass/components/alert.module.scss";

function OrderEdit() {
    const params = useParams()
    const userData = useAuthStore((state) => state.userData)
    const dietId = params.dietId
    const {data, isLoading, isError, isSuccess, error} = useOneOrderListQuery({id: dietId!, token: userData.token})
    const {data: userAddresses, isLoading: isAddressLoading, isError: isAddressError, isSuccess: isAddressSuccess} = useUserAddressListQuery({id: userData.id, token: userData.token})
    return (
        <section>
            {(isLoading || isAddressLoading) && <Grid/>}
            {(isError || isAddressError) && (
                <Alert variant={'light'} title={'Wystąpił błąd'} color={'red'} classNames={{root: alertStyles.alert,title: alertStyles.alert__title,message: alertStyles.alert__message}}>
                    {error?.message}
                </Alert>
            )}
            {(isSuccess && isAddressSuccess) && (
                <OrderForm order={data!.order} addresses={userAddresses!.addresses} userToken={userData.token}/>
            )}
        </section>
    )
}

export default OrderEdit