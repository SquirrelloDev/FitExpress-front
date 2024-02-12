import {MutationFunction, MutationKey, useMutation} from "@tanstack/react-query";
import {UserData} from "../../types/dbtypes/UserData";
import {AxiosError, isAxiosError} from "axios";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {z} from "zod";
import errorMessages from "../../utils/errorMessages";
import {UserPrefs} from "../../types/userPrefs";

export const LoginFormSchema = z.object({
    email: z.string().min(1, errorMessages.required).max(60, 'max 60').email(errorMessages.invalidMail),
    password: z.string().min(8, errorMessages.shortPasswd(8))
})
export type LoginFormDataSchema = z.infer<typeof LoginFormSchema>
type LoginResponse = {
    data: UserData & UserPrefs
}
export type LoginErrorType = AxiosError<{
    errors: { general: string }
}>
const loginUser: MutationFunction<LoginResponse, LoginFormDataSchema> = async (loginData) => {
    const res = await FitExpressClient.getInstance().post<LoginResponse>(
        apiRoutes.LOGIN,
        {email: loginData.email, password: loginData.password}
    )
    if(isAxiosError(res) && res.response?.status === 404){
        throw new Error('Użytkownik o podanych danych nie istnieje!')
    }
    if(isAxiosError(res) && res.response?.status === 401){
        throw new Error('Niepoprawne hasło!')
    }
    return {data: res.data as never}
}
export const mutationKey: MutationKey = ['loginUser']
export type SuccessFunctionMutation<T> = (
    data: LoginResponse,
    variables: T
) => unknown
export type ErrorFunctionMutation = (
    err: LoginErrorType,
    variables: LoginFormDataSchema
) => unknown


function useLoginMutation(
    onSuccess?: SuccessFunctionMutation<LoginFormDataSchema>,
    onError?: ErrorFunctionMutation
) {
    const {
        mutate,
        error,
        isLoading,
        isSuccess,
        reset
    } = useMutation<LoginResponse,LoginErrorType,LoginFormDataSchema>(mutationKey, loginUser, {onSuccess, onError, networkMode: 'always'})
    return {mutate, error, isLoading, isSuccess, reset}
}

export default useLoginMutation