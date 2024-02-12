import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {appRoutes} from "../utils/routes";
import useAuthStore from "../stores/authStore";
import {UserData} from "../types/dbtypes/UserData";
import useUserPrefsStore from "../stores/userPrefsStore";
import {UserPrefs} from "../types/userPrefs";
function useSuccessfulLogin(appRoute: string) {
    const navigate = useNavigate()
    const setUserData = useAuthStore((state) => state.setUserData)
    const setUserPrefs = useUserPrefsStore((state) => state.setUserPrefs)

    const handleSuccess = useCallback(
        (data:{data: UserData & UserPrefs}) => {
            setUserData(data.data)
            setUserPrefs({calories: data.data.calories, user_goal:data.data.user_goal})
            if(data.data.healthDataNotFilled){
                navigate(appRoutes.healthCard);
            }
            else{
            navigate(appRoute)
            }
        },
        [setUserData, setUserPrefs, navigate, appRoute]
    )

    return handleSuccess
}

export default useSuccessfulLogin