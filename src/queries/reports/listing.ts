import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {Report} from "../../types/dbtypes/Report";
import {AuthParams} from "../../types/queriesTypes/queriesTypes";
import {isAxiosError} from "axios";

interface paginationInfo {
    totalItems: number,
    hasNextPage: boolean,
    hasPrevoiusPage: boolean,
    nextPage: number,
    previousPage: number,
    lastPage: number

}

interface ReportsResponse {
    reports: Report[]
    paginationInfo: paginationInfo
}

 interface UserReportsResponse {
    userReports: Report[]
}
const userReportPartialKey = 'UserReports'
type UserReportsParams = AuthParams & {id: string}
type UserReportsListKey = [typeof userReportPartialKey, UserReportsParams]
const listUserReports: QueryFunction<UserReportsResponse, UserReportsListKey> = async ({signal, queryKey}) => {
    const [,{id, token, pageSize, pageIndex}] = queryKey
    const res = await FitExpressClient.getInstance().get<ReportsResponse>(apiRoutes.GET_REPORTS_USER(id, pageIndex, pageSize), {signal, headers: {
        Authorization: `Bearer ${token}`
        }});
    if(isAxiosError(res) && res.response?.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return res.data as unknown as UserReportsResponse
}
export function useUserReportsQuery(params: UserReportsParams){
    const queryKey = ['UserReports', params] as UserReportsListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery(queryKey, listUserReports)
    return {data, error, isError, isSuccess, isLoading}
}