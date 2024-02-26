import {apiRoutes, FitExpressClient} from "../../utils/api";
import {useQuery} from "@tanstack/react-query";


const partialGeocodeKey = 'Geocode-Address'
export type GeocodeParams = {
    street: string,
    buildingNumber: number,
    city: string,
    postal: string,
    voivodeship: string

}
type GeocodeKey = [typeof partialGeocodeKey, GeocodeParams]
const geocode = async ({signal, queryKey}) => {
    const [,{street,buildingNumber,city,postal,voivodeship}] = queryKey
    const combinedAddress = `${street} ${buildingNumber} ${postal}, ${city},${voivodeship}`
    const res = await FitExpressClient.getInstance().get(apiRoutes.GEOCODE(combinedAddress), {signal})
    return {data: res.data};
}
export function useGeoCode(params: GeocodeParams) {
    const queryKey = ['Geocode-Address', params] as GeocodeKey
    const {data, isLoading, isSuccess, refetch} = useQuery(queryKey, geocode, {enabled: false, onSuccess: (data) => {
        console.log(data);
        }})
    return {data, isLoading, isSuccess, refetch}
}