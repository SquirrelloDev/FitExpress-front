import {z} from "zod";
import errorMessages from "../../utils/errorMessages";
import {HealthData} from "../../types/dbtypes/HealthData";
import {AxiosError} from "axios";
import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {appRoutes} from "../../utils/routes";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const dateErrorMap: z.ZodErrorMap = (error) => {
    if (error.code === z.ZodIssueCode.invalid_date) {
        return {message: errorMessages.required}
    }
    return null
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const selectErrorMap: z.ZodErrorMap = (error) => {
    if (error.code === z.ZodIssueCode.invalid_type) {
        return {message: errorMessages.required}
    }
    return null
}
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
function useHealthPatch() {
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<HealthResponse, HealthError, PatchHealthData>(['Health-Patch'], updateHealthCard, {onSuccess: () => {
            navigate(appRoutes.healthCardSummary);
        },
        onError: (error) => {
            toast.error(error.message)
        }}
    )
    return {mutate, isError, isLoading, isSuccess, error}
}
export default useHealthPatch