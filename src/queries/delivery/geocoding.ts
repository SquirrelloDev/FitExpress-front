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
export type ReverseGeocodeResponse = {
    data: {
        results: {
           street: string,
           city: string,
           housenumber: string,
            postcode: string,
            state: string
        }[]
    }
}
const reversePartialKey = 'Reverse-Address'
type ReverseGeocodeParams = {
    lat: number,
    lng: number
}
type ReverseKey = [typeof reversePartialKey, ReverseGeocodeParams]
const reverseGeocode:QueryFunction<ReverseGeocodeResponse, ReverseKey> = async ({signal, queryKey}) => {
    const [, {lat, lng}] = queryKey
    const res = await FitExpressClient.getInstance().get(apiRoutes.REVERSE_GEO(lat, lng), {signal})
    return {data: res.data}
}
export function useGeoCode(params: GeocodeParams) {
    const queryKey = ['Geocode-Address', params] as GeocodeKey
    const {data, isLoading, isSuccess, refetch} = useQuery(queryKey, geocode, {enabled: false})
    return {data, isLoading, isSuccess, refetch}
}
export function useReverseGeocodeQuery(params: ReverseGeocodeParams){
    const queryKey = ['Reverse-Address', params] as ReverseKey
    const {data, isLoading, isError, error, isSuccess, refetch} = useQuery(queryKey, reverseGeocode, {enabled: false})
    return {data, isLoading, isSuccess, refetch, isError, error}
}