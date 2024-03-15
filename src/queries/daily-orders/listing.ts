import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {DailyOrder} from "../../types/dbtypes/DailyOrder";


type OneAuthParams = {
    token: string,
    date: string
}


const oneDailyOrderPartialKey = 'DailyOrderList'
type OneDailyOrderListKey = [typeof oneDailyOrderPartialKey, OneAuthParams]

interface OneDailyOrderResponse {
    daily: DailyOrder
}
const listOneDailyOrder: QueryFunction<OneDailyOrderResponse, OneDailyOrderListKey> = async ({signal, queryKey}) => {
    const [, {token, date}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneDailyOrderResponse>(apiRoutes.GET_DAILY_DATE(date), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {daily: res.data as unknown} as OneDailyOrderResponse
}
export function useOneDailyOrderListQuery(params: OneAuthParams){
    const queryKey = ['DailyOrderList', params] as OneDailyOrderListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneDailyOrder
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}