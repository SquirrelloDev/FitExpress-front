import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z} from "zod";
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient} from "../../utils/api";

const requestSchema = z.object({
    email: z.string().email(errorMessages.invalidMail)
})
export type RequestPasswdSchema = z.infer<typeof requestSchema>
type PasswdResponse = {message: string, token: string}
type PasswdError = AxiosError<{general: string}>
export type PasswdPostData = {
    email: string
}
const requestChange:MutationFunction<PasswdResponse, PasswdPostData> = async (email) => {
  const res = await FitExpressClient.getInstance().post<PasswdResponse>(apiRoutes.REQ_PASSWD, {
      ...email
  })
    return {message: res.data.message, token: res.data.token}
}
export type NewPasswdData = {
    password: string
    resetToken: string
}
const changePasswd:MutationFunction<PasswdResponse, NewPasswdData> = async (newPasswd) => {
    const res = await FitExpressClient.getInstance().put(apiRoutes.NEW_PASSWD(newPasswd.resetToken), {
    password: newPasswd.password
    })
    return {message: res.data}
}
function usePasswdChangeRequest() {
    const {mutate, isLoading, isError, error} = useMutation<PasswdResponse, PasswdError, PasswdPostData>(['Passwd-Request'], requestChange)
    return {mutate, isLoading, isError, error}
}
export function usePasswdChange(){
    const {mutate, isLoading, isError, error} = useMutation<PasswdResponse, PasswdError, NewPasswdData>(['Passwd-Change'], changePasswd)
    return {mutate, isLoading, isError, error}
}
export default usePasswdChangeRequest