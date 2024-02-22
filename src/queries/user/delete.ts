import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import useAuthStore from "../../stores/authStore";

export const deletionKey = ['deleteUser'];
function useUserDelete(
) {
    const logout = useAuthStore(state => state.logout)
    const{mutate, error, isLoading} = useMutation(deletionKey, async({id, token}: {id:string, token: string}) => {

        await FitExpressClient.getInstance().delete(apiRoutes.DELETE_USER(id), {headers: {Authorization: `Bearer ${token}`}})
    }, {onSuccess: () => { logout() } , onError: (err: AxiosError) => toast.error(err.message)}
)
    return {mutate,error,isLoading};
}
export default useUserDelete