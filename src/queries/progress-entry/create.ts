import {OneAuthParams} from "../user/userOrders";
import {MutationFunction, useMutation} from "@tanstack/react-query";
import {ProgressError} from "./listing";
import {z} from "zod";
import {dateErrorMap} from "../orders/create";
import errorMessages from "../../utils/errorMessages";
import {apiRoutes, FitExpressClient} from "../../utils/api";
export const weightSchema = z.object({
    date: z.coerce.date({errorMap: dateErrorMap}),
    weight: z.coerce.number().min(1, errorMessages.required).max(450, 'Wartość musi się znajdować w przedziale 1-450')
})
export const waterSchema = z.object({
    date: z.coerce.date({errorMap: dateErrorMap}),
    water: z.coerce.number().min(1, errorMessages.required).max(5000, 'Wartość musi się znajdować w przedziale 1-5000')
})
export type WeightSchema = z.infer<typeof weightSchema>
export type WaterSchema = z.infer<typeof waterSchema>
export type PostProgressResponse = {
    message: string
}
export type ProgressData ={
    kind: 'water' | 'weight'
    data: {
        date: Date,
        weight?: number,
        water?: number
    }
} & OneAuthParams
const createEntry: MutationFunction<PostProgressResponse, ProgressData> = async (progrssData) => {
    const res = await FitExpressClient.getInstance().put(apiRoutes.ADD_ENTRY(progrssData.kind), {
        userId: progrssData.id,
        data: progrssData.data
    }, {headers: {
        Authorization: `Bearer ${progrssData.token}`
        }})
    return {message: res.data}
}
export type SuccessProgresssMutation<T> = (
    data: PostProgressResponse,
    variables: T
) => unknown
function useProgressCreate(onSuccess?: SuccessProgresssMutation<ProgressData>) {
    const {mutate, isLoading, isSuccess, isError, error} = useMutation<PostProgressResponse, ProgressError, ProgressData>(['Progress-Create'], createEntry, {
        onSuccess
    })
    return {mutate, isLoading, isSuccess, isError, error}
}
export default useProgressCreate