import {useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient} from "../../utils/api";
import {AxiosError} from "axios";
import {PostProgressResponse, SuccessProgresssMutation} from "./create";
import {ProgressError} from "./listing";


export const deletionKey = ['Delete-Progress'];
function useProgressDelete(
    onSuccess?: SuccessProgresssMutation<{id:string, token: string, date: Date, kind: 'water' | 'weight'}>
) {
    const{mutate, error, isLoading} = useMutation<PostProgressResponse, ProgressError, {id:string, token: string, date: Date, kind: 'water' | 'weight'}>(deletionKey, async({id, token, kind, date}: {id:string, token: string, date: Date, kind: 'water' | 'weight'}) => {

            const res = await FitExpressClient.getInstance().delete(apiRoutes.DELETE_ENTRY(kind, date.toISOString(), id), {headers: {Authorization: `Bearer ${token}`}})
            return {message: res.data} as PostProgressResponse
        }, {onSuccess: onSuccess , onError: (err: AxiosError) => console.error('Progress not deleted', err)}
    )
    return {mutate,error,isLoading};
}
export default useProgressDelete