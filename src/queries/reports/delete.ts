import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {OneAuthParams} from "../user/userOrders";
import {toast} from "react-hot-toast";
import {ReportError} from "./create";

export const deletionKey = ['deleteReport'];
type DeleteReportResponse = {
    message: string
}

type SuccessDeletionFunction<T> = (
    data: DeleteReportResponse,
    variables: T
) => unknown
function useReportDelete(
    onSuccess?: SuccessDeletionFunction<OneAuthParams>
) {
    const{mutate, error, isLoading} = useMutation<DeleteReportResponse, ReportError, OneAuthParams>(deletionKey, async({id, token}) => {
        const res = await FitExpressClient.getInstance().delete(apiRoutes.DELETE_REPORT(id), {headers: {Authorization: `Bearer ${token}`}})
        return {message: res.data}
        }, {onSuccess , onError: (err: AxiosError) => toast.error(err.message)}
    )
    return {mutate,error,isLoading};
}
export default useReportDelete