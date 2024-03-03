import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {AxiosError} from "axios";
import {z} from "zod";
import errorMessages from "../../utils/errorMessages";

export const dailySchema = z.object({
    mealId: z.string().min(1, errorMessages.required)
})
export type DailySchema = z.infer<typeof dailySchema>

type DailyResponse = {message: string}
type DailyError = AxiosError<{general: string}>
export type DailyPutData = {
    date: Date
    dietId: string
    userId: string
    orderId: string
    selectedMeals: string[],
    token:string
}
const addOrder:MutationFunction<DailyResponse, DailyPutData> = async (daily) =>{
    const res = await FitExpressClient.getInstance().put(apiRoutes.ADD_DAILY, {
        ...daily
    }, {headers: {Authorization: `Bearer ${daily.token}`}})
    return {message: res.data}
}
type SuccessMutationDaily<T> = (
    data: DailyResponse,
    variables: T
) => unknown
function useDailyCreate(onSuccess?:SuccessMutationDaily<DailyPutData>){
    const {mutate, isLoading, isSuccess, isError, error} = useMutation<DailyResponse, DailyError, DailyPutData>(['Add-daily'], addOrder, {onSuccess})
    return {mutate, isError, error, isLoading, isSuccess}

}
export default useDailyCreate