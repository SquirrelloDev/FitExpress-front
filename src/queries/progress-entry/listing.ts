import {OneAuthParams} from "../user/userOrders";
import {QueryFunction, useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {ProgressEntry} from "../../types/dbtypes/ProgressEntry";

const progressEntryPartialKey = 'List-Progress'
type ProgressEntryKey = [typeof progressEntryPartialKey, OneAuthParams]
export type ProgressResponse = {
    data: ProgressEntry[]
}
export type ProgressError = AxiosError<{general: string}>

const listProgress: QueryFunction<ProgressResponse, ProgressEntryKey> = async ({signal, queryKey}) =>{
    const [,{token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get(apiRoutes.GET_USER_PROGRESS(id), {signal, headers: {
        Authorization: `Bearer ${token}`
        }})
    return {data: res.data}
}
function useUserProgressQuery(params: OneAuthParams) {
    const queryKey = ['List-Progress', params]
    const {data, isLoading, isError, error, isSuccess} = useQuery(queryKey, listProgress)
    return {data, isLoading, isError, error, isSuccess}
}
export default useUserProgressQuery