import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {appRoutes} from "../utils/routes";
import useAuthStore from "../stores/authStore";
import {UserData} from "../types/dbtypes/UserData";

function useSuccessfulLogin(appRoute: string) {
    const navigate = useNavigate()
    const setUserData = useAuthStore((state) => state.setUserData)

    const handleSuccess = useCallback(
        (data:{data: UserData}) => {
            setUserData(data.data)
            if(data.data.healthDataNotFilled){
                navigate(appRoutes.healthCard);
            }
            else{
            navigate(appRoute)
            }
        },
        [setUserData, navigate, appRoute]
    )

    return handleSuccess
}

export default useSuccessfulLogin