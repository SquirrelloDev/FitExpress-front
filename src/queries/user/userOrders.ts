import {QueryFunction, useQuery} from "@tanstack/react-query";
import {Order} from "../../types/dbtypes/Order";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {isAxiosError} from "axios";
export type OneAuthParams = {
    token: string,
    id: string
}
interface UserOrdersResponse {
    orders: Order[]
}
const userOrdersPartialKey = 'UserOrders'
type UserOrdersListKey = [typeof userOrdersPartialKey, OneAuthParams]
const getUserOrders:QueryFunction<UserOrdersResponse, UserOrdersListKey> = async ({signal, queryKey}) =>{
    const [,{token, id}] = queryKey
    const res = await FitExpressClient.getInstance().get<UserOrdersResponse>(apiRoutes.GET_ORDERS_USER(id), {signal, headers: {Authorization: `Bearer ${token}`}})
    if(isAxiosError(res) && res.response?.status === 404){
        throw new Error('Brak zamówień')
    }
    if(res.status && res.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return {orders: res.data as unknown} as UserOrdersResponse
}
function useUserOrdersQuery(params: OneAuthParams) {
    const queryKey = ['UserOrders', params] as UserOrdersListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: getUserOrders
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export default useUserOrdersQuery