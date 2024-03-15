import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {DayFixed} from "../../types/dbtypes/DayFixed";
import {AuthParams} from "../../types/queriesTypes/queriesTypes";

interface paginationInfo {
    totalItems: number,
    hasNextPage: boolean,
    hasPrevoiusPage: boolean,
    nextPage: number,
    previousPage: number,
    lastPage: number

}
export type DayParams = {
    token: string,
    date: Date
}
const userPartialKey = 'FixedsList'
type FixedListKey = [typeof userPartialKey, AuthParams]

interface FixedResponse {
    fixedDays: DayFixed[]
    paginationInfo: paginationInfo
}
const fixedByDatePartialKey = 'FixedDay'
type OneFixedByDateKey = [typeof fixedByDatePartialKey, DayParams]

interface OneFixedResponse {
    day: DayFixed
}

const listFixed: QueryFunction<FixedResponse, FixedListKey> = async ({signal, queryKey}) => {
    const [, {token, pageSize, pageIndex}] = queryKey
    const res = await FitExpressClient.getInstance().get<FixedResponse>(apiRoutes.GET_FIXEDS(String(pageIndex + 1), String(pageSize)), {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as FixedResponse
}
const listFixedByDay: QueryFunction<OneFixedResponse, OneFixedByDateKey> = async ({signal, queryKey}) => {
    const [, {token, date}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneFixedResponse>(apiRoutes.GET_FIXED(date.toISOString()), {
        signal, headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return {day: res.data as unknown} as OneFixedResponse
}
function useFixedListQuery(params: AuthParams) {
    const queryKey = ['FixedsList', params] as FixedListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listFixed, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useFixedByDayQuery(params: DayParams, isEnabled = false){
    const queryKey = ['FixedDay', params] as OneFixedByDateKey
    const {data, error, isLoading, isSuccess, isError, refetch} = useQuery({
        queryKey, queryFn: listFixedByDay, enabled: isEnabled
    })
    return {data, error, isLoading, isSuccess, isError, refetch}
}

export default useFixedListQuery