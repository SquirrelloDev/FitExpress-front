import {useCallback} from "react";
import {useNavigate} from "react-router-dom";

function useOnlineStatus() {
    const navigate = useNavigate()
    const isAppOnline = useCallback(async () => {
        if(!navigator.onLine){
            navigate('/offline')
            return;
        }
        const url = new URL(window.location.origin)
        try {
            const res = await fetch(url.toString(), {method: 'HEAD', cache: 'no-store'})
            return res.ok
        }
        catch  {
            navigate('/offline')
        }
    }, [navigate])
    return isAppOnline
}
export default useOnlineStatus