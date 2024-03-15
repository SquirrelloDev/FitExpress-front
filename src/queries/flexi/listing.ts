import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {DayFlexi} from "../../types/dbtypes/DayFlexi";
import {AuthParams} from "../../types/queriesTypes/queriesTypes";
import {DayParams} from "../fixed/listing";

interface paginationInfo {
    totalItems: number,
    hasNextPage: boolean,
    hasPrevoiusPage: boolean,
    nextPage: number,
    previousPage: number,
    lastPage: number

}

const userPartialKey = 'FlexisList'
type FlexiListKey = [typeof userPartialKey, AuthParams]
const flexiByDatePartialKey = 'FlexiDay'
type OneFlexiByDateKey = [typeof flexiByDatePartialKey, DayParams]
interface FlexiResponse {
    flexiDays: DayFlexi[]
    paginationInfo: paginationInfo
}


interface OneFlexiResponse {
    day: DayFlexi
}

const listFlexi: QueryFunction<FlexiResponse, FlexiListKey> = async ({signal, queryKey}) => {
    const [, {token, pageSize, pageIndex}] = queryKey
    const res = await FitExpressClient.getInstance().get<FlexiResponse>(apiRoutes.GET_FLEXIS(String(pageIndex + 1), String(pageSize)), {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as FlexiResponse
}
const listFlexiByDay: QueryFunction<OneFlexiResponse, OneFlexiByDateKey> = async ({signal, queryKey}) => {
    const [, {token, date}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneFlexiResponse>(apiRoutes.GET_FLEXI(date.toISOString()), {
        signal, headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return {day: res.data as unknown} as OneFlexiResponse
}

function useFlexiListQuery(params: AuthParams) {
    const queryKey = ['FlexisList', params] as FlexiListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listFlexi, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useFlexiByDayQuery(params: DayParams,  isEnabled = false){
    const queryKey = ['FlexiDay', params] as OneFlexiByDateKey
    const {data, error, isLoading, isSuccess, isError, refetch} = useQuery({
        queryKey, queryFn: listFlexiByDay, enabled: isEnabled
    })
    return {data, error, isLoading, isSuccess, isError, refetch}
}

export default useFlexiListQuery