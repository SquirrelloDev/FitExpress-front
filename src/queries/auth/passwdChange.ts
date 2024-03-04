import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z} from "zod";
import errorMessages from "../../utils/errorMessages";
import {AxiosError, isAxiosError} from "axios";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import {toast} from "react-hot-toast";

export const requestSchema = z.object({
    email: z.string().email(errorMessages.invalidMail)
})
export type RequestPasswdSchema = z.infer<typeof requestSchema>
interface PasswdResponse {message: string}
interface PasswdTokenResponse extends PasswdResponse{
    token: string
}
type PasswdError = AxiosError<{general: string}>
export type PasswdPostData = {
    email: string
}
const requestChange:MutationFunction<PasswdTokenResponse, PasswdPostData> = async (email) => {
  const res = await FitExpressClient.getInstance().post<PasswdTokenResponse>(apiRoutes.REQ_PASSWD, {
      ...email
  })
    if(isAxiosError(res) && res.response?.status == 404){
        throw new Error('Użytkownik o podanym adresie e-mail nie istnieje!')
    }
    return {message: res.data.message, token: res.data.token}
}
export const changePasswdSchema = z.object({
    newPasswd: z.string().min(8, errorMessages.shortPasswd(8)),
    newPasswdConfirm: z.string().min(8, errorMessages.shortPasswd(8))
}).refine((data) => data.newPasswd === data.newPasswdConfirm, {
    message: 'Hasła nie są takie same',
    path: ['newPasswd']
})
export type ChangePasswdSchema = z.infer<typeof changePasswdSchema>
export type NewPasswdData = {
    password: string
    resetToken: string
}
const changePasswd:MutationFunction<PasswdResponse, NewPasswdData> = async (newPasswd) => {
    const res = await FitExpressClient.getInstance().put(apiRoutes.NEW_PASSWD(newPasswd.resetToken), {
    password: newPasswd.password
    })
    if(isAxiosError(res) && res.response?.status === 500){
        throw new Error('Sesja wygasła')
    }
    if(isAxiosError(res) && res.response?.status === 409){
        throw new Error('Nowe hasło jest takie samo jak stare hasło')
    }
    return {message: res.data}
}
function usePasswdChangeRequest() {
    const {mutate, isLoading, isError, error, isSuccess} = useMutation<PasswdTokenResponse, PasswdError, PasswdPostData>(['Passwd-Request'], requestChange)
    return {mutate, isLoading, isError, error, isSuccess}
}
export function usePasswdChange(){
    const navigate = useNavigate()
    const {mutate, isLoading, isError, error} = useMutation<PasswdResponse, PasswdError, NewPasswdData>(['Passwd-Change'], changePasswd, {onSuccess: () => {
        navigate(appRoutes.login);
        toast.success('Hasło zmieniono pomyślnie!')
        }})
    return {mutate, isLoading, isError, error}
}
export default usePasswdChangeRequest