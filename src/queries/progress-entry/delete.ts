import {useMutation} from "@tanstack/react-query";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {AxiosError} from "axios";

export const deletionKey = ['Delete-Progress'];
function useProgressDelete(
) {
    const{mutate, error, isLoading} = useMutation(deletionKey, async({id, token, kind, date}: {id:string, token: string, date: Date, kind: 'water' | 'weight'}) => {

            await FitExpressClient.getInstance().delete(apiRoutes.DELETE_ENTRY(kind, date.toISOString(), id), {headers: {Authorization: `Bearer ${token}`}})
        }, {onSuccess: () => queryClient.invalidateQueries({queryKey: ['List-Progress']}) , onError: (err: AxiosError) => console.error('Progress not deleted', err)}
    )
    return {mutate,error,isLoading};
}
export default useProgressDelete