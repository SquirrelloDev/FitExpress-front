import {z} from "zod";
import errorMessages, {dateErrorMap, selectErrorMap} from "../../utils/errorMessages";
import {HealthData} from "../../types/dbtypes/HealthData";
import {AxiosError} from "axios";
import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import toast from "react-hot-toast";

export const healthCardSchema = z.object({
    birth_date: z.coerce.date({errorMap: dateErrorMap}),
    user_height: z.coerce.number().min(120, errorMessages.minMax(120, 250)).max(250, errorMessages.minMax(120, 250)),
    user_weight_current: z.coerce.number().min(40, errorMessages.minMax(40, 500)).max(500, errorMessages.minMax(40, 500)),
    user_weight_planned: z.coerce.number().min(40, errorMessages.minMax(40, 500)).max(500, errorMessages.minMax(40, 500)),
    gender: z.string({errorMap: selectErrorMap}),
    pal_active: z.number({errorMap: selectErrorMap}),
    pal_passive: z.number({errorMap: selectErrorMap}),
    user_goal: z.string({errorMap: selectErrorMap})
})
export type UserHealthSchema = z.infer<typeof healthCardSchema>;
export type PatchHealthData = {
    _id: string,
    token: string
    healthData: HealthData
}
export type HealthError = AxiosError<{ general: string }>
export type HealthResponse = { message: string }
const updateHealthCard: MutationFunction<HealthResponse, PatchHealthData> = async (data) => {
    const res = await FitExpressClient.getInstance().patch<HealthResponse, HealthError>(apiRoutes.UPDATE_HEALTH, {
        ...data
    }, {headers: {Authorization: `Bearer ${data.token}`}})
    if (res.response && res.response?.status !== 200) {
        throw new Error('Coś poszło nie tak')
    }
    return {message: res.message}
}
export type SuccessPrefsMutation<T> = (
    data: HealthResponse,
    variables: T
) => unknown

function useHealthPatch(onSuccess?: SuccessPrefsMutation<PatchHealthData>) {
    const {
        mutate,
        isError,
        isLoading,
        isSuccess,
        error
    } = useMutation<HealthResponse, HealthError, PatchHealthData>(['Health-Patch'], updateHealthCard, {
            onSuccess: onSuccess,
            onError: (error) => {
                toast.error(error.message)
            }
        }
    )
    return {mutate, isError, isLoading, isSuccess, error}
}

export default useHealthPatch