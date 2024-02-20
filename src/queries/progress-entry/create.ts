import {OneAuthParams} from "../user/userOrders";
import {MutationFunction, useMutation} from "@tanstack/react-query";
import {ProgressError} from "./listing";
import {z} from "zod";
import {dateErrorMap} from "../orders/create";
import errorMessages from "../../utils/errorMessages";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
export const weightSchema = z.object({
    date: z.coerce.date({errorMap: dateErrorMap}),
    weight: z.number().min(1, errorMessages.required)
})
export const waterSchema = z.object({
    date: z.coerce.date({errorMap: dateErrorMap}),
    water: z.number().min(1, errorMessages.required)
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
function useProgressCreate() {
    const {mutate, isLoading, isSuccess, isError, error} = useMutation<PostProgressResponse, ProgressError, ProgressData>(['Progress-Create'], createEntry, {
        onSuccess: () => {
            queryClient.invalidateQueries(['List-Progress'])
        }
    })
    return {mutate, isLoading}
}
export default useProgressCreate