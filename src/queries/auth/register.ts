import {MutationFunction, MutationKey, useMutation} from "@tanstack/react-query";
import {UserData} from "../../types/dbtypes/UserData";
import {AxiosError, isAxiosError} from "axios";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {z} from "zod";
import errorMessages from "../../utils/errorMessages";
import {UserPrefs} from "../../types/userPrefs";

export const RegisterFormSchema = z.object({
    name: z.string().min(1, errorMessages.required),
    email: z.string().min(1, errorMessages.required).max(60, 'max 60').email(errorMessages.invalidMail),
    phone: z.string().min(9, errorMessages.required).regex(/[0-9]{9}/, "To nie wygląda jak numer telefonu..."),
    password: z.string().min(8, "Hasło nie spełnia wymogów").regex(/[0-9]+/, "Hasło nie spełnia wymogów").regex(/[@$!%*#?&]+/, "Hasło nie spełnia wymogów")
})
export type RegisterFormDataSchema = z.infer<typeof RegisterFormSchema>
type RegisterResponse = {
    data: UserData & UserPrefs
}
export type LoginErrorType = AxiosError<{
    errors: { general: string }
}>
const registerUser: MutationFunction<RegisterResponse, RegisterFormDataSchema> = async (registerData) => {
    const res = await FitExpressClient.getInstance().post<RegisterResponse>(
        apiRoutes.REGISTER,
        {name: registerData.name, email: (registerData.email).toLowerCase(), phone: registerData.phone, password: registerData.password}
    )
    if(isAxiosError(res) && res.response?.status === 409){
        throw new Error('Użytkownik o podanym adresie e-mail już istnieje!')
    }
    return {data: res.data as never}
}
export const mutationKey: MutationKey = ['registerUser']
export type SuccessFunctionMutation<T> = (
    data: RegisterResponse,
    variables: T
) => unknown
export type ErrorFunctionMutation = (
    err: LoginErrorType,
    variables: RegisterFormDataSchema
) => unknown


function useRegisterMutation(
    onSuccess?: SuccessFunctionMutation<RegisterFormDataSchema>,
    onError?: ErrorFunctionMutation
) {
    const {
        mutate,
        error,
        isError,
        isLoading,
        isSuccess,
        reset
    } = useMutation<RegisterResponse,LoginErrorType,RegisterFormDataSchema>(mutationKey, registerUser, {onSuccess, onError, networkMode: 'always'})
    return {mutate, error, isLoading, isError, isSuccess, reset}
}

export default useRegisterMutation