import {MutationFunction, useMutation} from "@tanstack/react-query";
import {PostProgressResponse, ProgressData} from "./create";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {ProgressError} from "./listing";

const updateEntry: MutationFunction<PostProgressResponse, ProgressData> = async (progressData) => {
    const res = await FitExpressClient.getInstance().patch(apiRoutes.EDIT_ENTRY(progressData.kind, progressData.data.date.toISOString()), {
        userId: progressData.id,
        data: progressData.data,
    }, {headers: {
            Authorization: `Bearer ${progressData.token}`
        }})
    return{message: res.data}
}
function useProgressPatch() {
    const {mutate, isError, error, isSuccess, isLoading} = useMutation<PostProgressResponse, ProgressError, ProgressData>(['Edit-Progress'], updateEntry, {onSuccess: () => {
            queryClient.invalidateQueries(['List-Progress'])
        }})
    return {mutate, isError, error, isSuccess, isLoading}
}
export default useProgressPatch