import {apiRoutes, FitExpressClient} from "../../utils/api";
import {QueryFunction, useQuery} from "@tanstack/react-query";


const partialGeocodeKey = 'Geocode-Address'
export type GeocodeParams = {
    street: string,
    buildingNumber: number,
    city: string,
    postal: string,
    voivodeship: string

}
type GeocodeKey = [typeof partialGeocodeKey, GeocodeParams]
type GeocodeResponse = {
    data: {
        features:{
            properties: {
                lat: number,
                lon: number
            }
        }[]
    }
}
const geocode:QueryFunction<GeocodeResponse ,GeocodeKey> = async ({signal, queryKey}) => {
    const [,{street,buildingNumber,city,postal,voivodeship}] = queryKey
    const combinedAddress = `${street} ${buildingNumber} ${postal}, ${city},${voivodeship}`
    const res = await FitExpressClient.getInstance().get(apiRoutes.GEOCODE(combinedAddress), {signal})
    return {data: res.data};
}
export function useGeoCode(params: GeocodeParams) {
    const queryKey = ['Geocode-Address', params] as GeocodeKey
    const {data, isLoading, isSuccess, refetch} = useQuery(queryKey, geocode, {enabled: false})
    return {data, isLoading, isSuccess, refetch}
}