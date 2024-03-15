import {QueryFunction, useQuery} from "@tanstack/react-query";
import {UserFullData} from "../../types/dbtypes/UserData";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {isAxiosError} from "axios";

type OneAuthParams = {
    token: string,
    id: string
}

const oneUserPartialKey = 'UserList'
type OneUserListKey = [typeof oneUserPartialKey, OneAuthParams]

interface OneUserResponse {
    user: UserFullData
}
const listOneUser: QueryFunction<OneUserResponse, OneUserListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneUserResponse>(apiRoutes.GET_USER(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    if (isAxiosError(res) && res.response?.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return {user: res.data as unknown} as OneUserResponse
}
export function useOneUserListQuery(params: OneAuthParams){
    const queryKey = ['UserList', params] as OneUserListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneUser
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}