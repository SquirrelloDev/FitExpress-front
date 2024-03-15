import {QueryFunction, useQuery} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {Meal} from "../../types/dbtypes/Meal";

type OneAuthParams = {
    token: string,
    id: string
}

const oneMealPartialKey = 'MealList'
type OneMealListKey = [typeof oneMealPartialKey, OneAuthParams]

interface OneMealResponse {
    meal: Meal
}
const listOneMeal: QueryFunction<OneMealResponse, OneMealListKey> = async ({signal, queryKey}) => {
    const [, {token, id}] = queryKey;
    const res = await FitExpressClient.getInstance().get<OneMealResponse>(apiRoutes.GET_MEAL(id), {
        signal, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return {meal: res.data as unknown} as OneMealResponse
}
export function useOneMealListQuery(params: OneAuthParams){
    const queryKey = ['MealList', params] as OneMealListKey
    const {data, error, isLoading, isSuccess, isError} = useQuery({
            queryKey, queryFn: listOneMeal
        }
    )
    return {data, error, isError, isSuccess, isLoading}
}