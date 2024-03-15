import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {Address} from "../../types/dbtypes/Address";

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

interface AddressesResponse {
    addresses: Address[]
    paginationInfo: paginationInfo
}

const oneAddressPartialKey = 'AddressList'
type OneAddressListKey = [typeof oneAddressPartialKey, OneAuthParams]

interface OneAddressResponse {
    address: Address
}

const getUserAddressesPartialKey = 'UserAddresses'
type UserAddressesKey = [typeof getUserAddressesPartialKey, OneAuthParams]
const listOneAddress: QueryFunction<OneAddressResponse, OneAddressListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneAddressResponse>(apiRoutes.GET_ADDRESS(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {address: res.data as unknown} as OneAddressResponse
}
const listUserAddresses: QueryFunction<AddressesResponse, UserAddressesKey> = async ({signal, queryKey}) => {
  const [, {token, id}] = queryKey;
  const res = await FitExpressClient.getInstance().get<AddressesResponse>(apiRoutes.GET_ADDRESSES_USER(id), {
      signal, headers: {
          Authorization: `Bearer ${token}`
        }
    })
    return res.data as AddressesResponse
}
export function useOneAddressListQuery(params: OneAuthParams){
    const queryKey = ['AddressList', params] as OneAddressListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneAddress
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}
export function useUserAddressListQuery(params: OneAuthParams){
    const queryKey = ['UserAddresses', params] as UserAddressesKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listUserAddresses
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}