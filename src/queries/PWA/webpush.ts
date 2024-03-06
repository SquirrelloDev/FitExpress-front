import {MutationFunction, useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {FitExpressClient} from "../../utils/api";
import usePwaStore from "../../stores/pwaStore";

type WebpushResponse = {
    message: string
}
type WebPushError = AxiosError<{general: string}>
export type WebPushCreateData = {
    subscription: PushSubscription,
    token: string
}
const addSubscription:MutationFunction<WebpushResponse, WebPushCreateData> = async ({subscription, token}) => {
    const res = await FitExpressClient.getInstance().post(`http://localhost:3001/push/create`, JSON.stringify(subscription), {
        headers: {Authorization: `Bearer ${token}`}
    })
    return {message: res.data}
}
export type WebPushRemoveData = {
    endpoint: string,
    token: string
}
const deleteSubscription:MutationFunction<WebpushResponse, WebPushRemoveData> = async ({endpoint, token}) => {
    const res = await FitExpressClient.getInstance().post(`http://localhost:3001/push/remove`, {endpoint}, {
        headers: {Authorization: `Bearer ${token}`}
    })
    return {message: res.data}
}
function usePushCreate() {
    const setNotification = usePwaStore(state => state.setNotification)
    const {mutate, isLoading, isError, error} = useMutation<WebpushResponse, WebPushError, WebPushCreateData>(['Webpush-Create'], addSubscription, {
        onSuccess: () => {
            setNotification(true)
        }
    })
    return {mutate, isLoading, isError, error}
}
export function usePushRemove(){
    const setNotification = usePwaStore(state => state.setNotification)
    const {mutate, isLoading, isError, error} = useMutation<WebpushResponse, WebPushError, WebPushRemoveData>(['Webpush-Delete'], deleteSubscription, {onSuccess: () => {
        setNotification(false)
        }})
    return {mutate, isLoading, isError, error}
}
export default usePushCreate