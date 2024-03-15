import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {Promocode} from "../../types/dbtypes/Promocode";
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
const userPartialKey = 'PromosList'
type PromosListKey = [typeof userPartialKey, AuthParams]

interface PromosResponse {
    promocodes: Promocode[]
    paginationInfo: paginationInfo
}

type NamePromoParams = {
    token: string,
    name: string,
    userId: string
}

const namePromoPartialKey = 'PromoName'
type NamePromoListKey = [typeof namePromoPartialKey, NamePromoParams]

interface OnePromoResponse {
    promocode: Promocode
}

const listPromos: QueryFunction<PromosResponse, PromosListKey> = async ({signal, queryKey}) => {
    const [, {token, pageSize, pageIndex}] = queryKey
    const res = await FitExpressClient.getInstance().get<PromosResponse>(apiRoutes.GET_PROMOCODES(String(pageIndex + 1), String(pageSize)), {
        signal,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return res.data as PromosResponse
}
const getPromoByName: QueryFunction<OnePromoResponse, NamePromoListKey> = async ({signal, queryKey}) => {
    const [,{token, name, userId}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OnePromoResponse>(apiRoutes.GET_PROMOCODE_NAME(name, userId), {
        signal, headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if(isAxiosError(res) && res.response?.status === 404){
        throw new Error('Podany kod nie istnieje albo utracił ważność!')
    }
    if(isAxiosError(res) && res.response?.status === 409){
        throw new Error('Podany kod został już wykorzystany na tym koncie!')
    }
    return {promocode: res.data as unknown} as OnePromoResponse
}

function usePromosListQuery(params: AuthParams) {
    const queryKey = ['PromosList', params] as PromosListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listPromos, keepPreviousData: true
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useNamePromoQuery(params: NamePromoParams){
    const queryKey = ['PromoName',params] as NamePromoListKey
    const {data, error, isLoading, isSuccess, isError, refetch} = useQuery({
            queryKey, queryFn: getPromoByName, enabled: false
        }
    )
    return {data, error, isError, isSuccess, isLoading, refetch}
}

export default usePromosListQuery