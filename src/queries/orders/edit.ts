import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
import {OrderError, OrderPostData, OrderResponse,} from "./create";
import {z} from "zod";
import errorMessages from "../../utils/errorMessages";

export const orderClientEditSchema = z.object({
    name: z.string().min(1, errorMessages.required),
    address: z.string().min(1, errorMessages.required)
})
export type OrderClientEditSchema = z.infer<typeof orderClientEditSchema>;

export type OrderPutData = OrderPostData & {id: string}
const updateOrder:MutationFunction<OrderResponse, OrderPutData> = async (order) => {
    const res = await FitExpressClient.getInstance().put<OrderResponse, OrderError>(apiRoutes.EDIT_ORDER(order.id), {
            ...order.order
    }, {headers: {Authorization: `Bearer ${order.token}`}})
    if(res.response?.status && res.response?.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}

export function useOrderActivity(){
    const {mutate, isLoading, isError, error} = useMutation(['Order-Status'], async ({status, id, token}: {status: boolean, id: string, token:string}) => {
    const res = await FitExpressClient.getInstance().patch<OrderResponse, OrderError>(apiRoutes.UPDATE_STATUS(id), {
            status: status
        }, {headers: {Authorization: `Bearer ${token}`}})
        if (res.response?.status && res.response.status !== 200){
            throw new Error('Coś poszło nie tak')
        }
        return { message: res.message }
    }, {onSuccess: () =>{
            toast.success('Zamówienie zostało deaktywowane!');
            queryClient.invalidateQueries(['UserOrders'])
        },
        onError: (error) => {
            toast.error(error.message)
        }
        })
    return {mutate, isLoading, isError, error}
}
function useOrderEdit(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<OrderResponse, OrderError, OrderPutData>(['Order-Update'], updateOrder, {onSuccess: () => {
            toast.success('Zamówienie zedytowane!');
            queryClient.invalidateQueries(['OrdersList'])
            queryClient.invalidateQueries(['OrderList'])
            navigate(appRoutes.dietManagement);
        },
        onError: (error) => {
            toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useOrderEdit