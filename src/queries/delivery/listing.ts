import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";

const deliveryPartialKey = 'GetInRange'
type DeliveryParams = {
    lat?: number,
    lng?: number,
    token: string
}
type DeliveryKey = [typeof deliveryPartialKey, DeliveryParams]
interface DeliveryResponse {
    inRange: boolean,
    allowedPoints: string[]
}
const getPointsInRange:QueryFunction<DeliveryResponse, DeliveryKey> = async ({signal, queryKey}) => {
    const [,{token, lng, lat}] = queryKey
    const res = await FitExpressClient.getInstance().get<DeliveryResponse>(apiRoutes.GET_DELIVERY_RANGE(lat ? lat : 0, lng ? lng : 0), {signal,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return {inRange: res.data.inRange, allowedPoints: res.data.allowedPoints}
}
function useDeliveryRange(params: DeliveryParams) {
    const queryKey = ['GetInRange', params] as DeliveryKey
    const {data, isLoading, isSuccess, isError, error, refetch, isRefetching, isFetching} = useQuery(queryKey, getPointsInRange, {enabled: false})
    return {data, isLoading, isSuccess, isError, error, refetch, isRefetching, isFetching}
}
export default useDeliveryRange