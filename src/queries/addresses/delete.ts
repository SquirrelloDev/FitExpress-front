import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {OneAuthParams} from "../user/userOrders";
import {AddressError} from "./create";

export const deletionKey = ['deleteAddress'];
type DeleteAddressResponse = {
    message: string
}

type SuccessDeletionFunction<T> = (
    data: DeleteAddressResponse,
    variables: T
) => unknown
function useAddressDelete(
    onSuccess?: SuccessDeletionFunction<OneAuthParams>
) {
    const{mutate, error, isLoading} = useMutation<DeleteAddressResponse, AddressError, OneAuthParams>(deletionKey, async({id, token}: {id:string, token: string}) => {
           const res = await FitExpressClient.getInstance().delete(apiRoutes.DELETE_ADDRESS(id), {headers: {Authorization: `Bearer ${token}`}})
            return {message: res.data}
        }, {onSuccess: onSuccess , onError: (err: AxiosError) => toast.error(err.message)}
    )
    return {mutate,error,isLoading};
}
export default useAddressDelete