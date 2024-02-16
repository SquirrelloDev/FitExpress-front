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

type OneAuthParams = {
    token: string,
    id: string
}
const userPartialKey = 'PromosList'
type PromosListKey = [typeof userPartialKey, AuthParams]

interface PromosResponse {
    promocodes: Promocode[]
    paginationInfo: paginationInfo
}

const onePromoPartialKey = 'PromoList'
type OnePromoListKey = [typeof onePromoPartialKey, OneAuthParams]

type NamePromoParams = {
    token: string,
    name: string
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
const listOnePromo: QueryFunction<OnePromoResponse, OnePromoListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OnePromoResponse>(apiRoutes.GET_PROMOCODE_ID(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {promocode: res.data as unknown} as OnePromoResponse
}
const getPromoByName: QueryFunction<OnePromoResponse, NamePromoListKey> = async ({signal, queryKey}) => {
    const [,{token, name}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OnePromoResponse>(apiRoutes.GET_PROMOCODE_NAME(name), {
        signal, headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if(isAxiosError(res) && res.response?.status === 404){
        throw new Error('Podany kod nie istnieje albo utracił ważność!')
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
export function useOnePromoListQuery(params: OneAuthParams){
    const queryKey = ['PromoList', params] as OnePromoListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOnePromo
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