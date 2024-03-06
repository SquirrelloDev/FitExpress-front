import {ReverseGeocodeResponse, useReverseGeocodeQuery} from "../queries/delivery/geocoding";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";

type SuccessReverseGeocode = (data: ReverseGeocodeResponse) => unknown
function useReverseGeocode(onSuccess: SuccessReverseGeocode) {
    const [coords, setCoords] = useState<{lat: number, lng: number}>({lat: 0, lng: 0})
    const {data: reverseData, refetch: reverseGeocode, isSuccess} = useReverseGeocodeQuery(coords)
    useEffect(() => {
        if(coords.lat !== 0 && coords.lng !== 0){
        reverseGeocode()
        }
    }, [coords, reverseGeocode])
    useEffect(() => {
        if(isSuccess){
            onSuccess(reverseData!)
        }
    }, [isSuccess, onSuccess, reverseData])
    const logPosition = () =>{
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                    setCoords({lat: position.coords.latitude, lng: position.coords.longitude})
                },
                () => toast.error('Wystąpił problem z pobraniem lokalizacji'))
        }
    }
    return logPosition

}
export default useReverseGeocode