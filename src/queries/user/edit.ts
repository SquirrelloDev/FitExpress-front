import {MutationFunction, useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {z} from "zod";
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";

export type UserError = AxiosError<{errors: {general: string}}>
export type UserResponse = {message: string}
export type UserPutData = {
    user: {
        name: string,
        email: string,
        phone: string,
    },
    authInfo: {
        token: string,
        id: string
    }
}
export const userPutSchema = z.object({
    name: z.string().min(1, errorMessages.required),
    email: z.string().email(errorMessages.invalidMail),
    phone: z.string().min(9, errorMessages.required).regex(/[0-9]{9}/, "To nie wygląda jak numer telefonu..."),
})
export type UserPutSchema = z.infer<typeof userPutSchema>;
const updateUser:MutationFunction<UserResponse, UserPutData> = async (user) => {
    const res = await FitExpressClient.getInstance().put<UserResponse, UserError>(apiRoutes.EDIT_USER(user.authInfo.id), {
        ...user.user
    }, {headers: {'Content-Type': "application/json", Authorization: `Bearer ${user.authInfo.token}`}})
    if(res.response?.status && res.response?.status !== 200){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useUserEdit(){
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<UserResponse, UserError, UserPutData>(['User-Update'], updateUser, {onSuccess: () => {
            toast.success('Edycja przebiegła pomyślnie!');
            queryClient.invalidateQueries(['UserList'])
        },
        onError: (error) => {
            toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useUserEdit