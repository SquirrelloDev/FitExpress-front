import {isServer, QueryClient} from "@tanstack/react-query";
import axios, {AxiosInstance} from "axios";
import authStore from "../stores/authStore";
import {toast} from "react-hot-toast";

const endpointURL = {
    dev: 'http://localhost:3001',
    prod: 'https://fitexpress-back.onrender.com'
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            ...(!isServer && { staleTime: 1000 * 60 }),
            retry: 1,
        },
    },
})
export class FitExpressClient {
    private static clientInstance: FitExpressClient
    private axiosInstance: AxiosInstance
    private constructor() {
        this.axiosInstance = axios.create({
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    public static getInstance(){
        //if instance exists, return the current instance
        if (this.clientInstance) {
            return this.clientInstance.axiosInstance
        }
        this.clientInstance = new FitExpressClient()
        this.clientInstance.axiosInstance.interceptors.response.use((response) =>{
            return response
        }, (error) => {
            if(error.response.status === 401 || error.response.data.message === 'jwt expired'){
                toast.error('Twoja sesja wygasła')
                authStore.getState().logout()
            }
            return error
        })
        return this.clientInstance.axiosInstance;
    }
}
const geoapiKey = 'df6a8c18019f4523b077b0ddd70584c7'
export const apiRoutes = {
    // AUTH
    LOGIN: `${endpointURL.prod}/users/login/`,
    REGISTER: `${endpointURL.prod}/users`,
    REQ_PASSWD: `${endpointURL.prod}/users/password-request`,
    NEW_PASSWD: (resetToken: string) => `${endpointURL.prod}/users/password?token=${resetToken}`,
    // USERS
    GET_USERS: (page: string, pageSize: string) => `${endpointURL.prod}/users?page=${page}&pageSize=${pageSize}`,
    GET_USER: (id: string) => `${endpointURL.prod}/users/${id}`,
    ADD_USER: `${endpointURL.prod}/users`,
    EDIT_USER: (id: string) => `${endpointURL.prod}/users/${id}`,
    UPDATE_HEALTH: `${endpointURL.prod}/users/hcard`,
    DELETE_USER: (id: string) => `${endpointURL.prod}/users/${id}`,
//     MEALS
    GET_MEALS: (page: string, pageSize: string) => `${endpointURL.prod}/meals?page=${page}&pageSize=${pageSize}`,
    ADD_MEAL: `${endpointURL.prod}/meals`,
    GET_MEAL: (id: string) => `${endpointURL.prod}/meals/${id}`,
    EDIT_MEAL: (id: string) => `${endpointURL.prod}/meals/${id}`,
    DELETE_MEAL: (id: string) => `${endpointURL.prod}/meals/${id}`,
//     TAGS
    GET_TAGS: (page: string, pageSize: string) => `${endpointURL.prod}/tags?page=${page}&pageSize=${pageSize}`,
    GET_TAG: (id: string) => `${endpointURL.prod}/tags/${id}`,
    ADD_TAG: `${endpointURL.prod}/tags`,
    EDIT_TAG: (id: string) => `${endpointURL.prod}/tags/${id}`,
    DELETE_TAG: (id: string) => `${endpointURL.prod}/tags/${id}`,
//     DIETS
    GET_DIETS: (page: string, pageSize: string, dietType: string) => `${endpointURL.prod}/diets?page=${page}&pageSize=${pageSize}&dietType=${dietType}`,
    ADD_DIET: `${endpointURL.prod}/diets`,
    GET_DIET: (id: string) => `${endpointURL.prod}/diets/${id}`,
    EDIT_DIET: (id: string) => `${endpointURL.prod}/diets/${id}`,
    DELETE_DIET: (id: string) => `${endpointURL.prod}/diets/${id}`,
//     FIXED
    GET_FIXEDS: (page: string, pageSize: string) => `${endpointURL.prod}/days/fixed?page=${page}&pageSize=${pageSize}`,
    ADD_FIXED: `${endpointURL.prod}/days/fixed`,
    GET_FIXED: (date: string) => `${endpointURL.prod}/days/fixed/day?date=${date}`,
    GET_FIXED_ID: (id: string) => `${endpointURL.prod}/days/fixed/${id}`,
    EDIT_FIXED: (id: string) => `${endpointURL.prod}/days/fixed/${id}`,
    DELETE_FIXED: (id: string) => `${endpointURL.prod}/days/fixed/${id}`,
//     FLEXI
    GET_FLEXIS: (page: string, pageSize: string) => `${endpointURL.prod}/days/flexi?page=${page}&pageSize=${pageSize}`,
    ADD_FLEXI: `${endpointURL.prod}/days/flexi`,
    GET_FLEXI: (date: string) => `${endpointURL.prod}/days/flexi/day?date=${date}`,
    GET_FLEXI_ID: (id: string) => `${endpointURL.prod}/days/flexi/${id}`,
    EDIT_FLEXI: (id: string) => `${endpointURL.prod}/days/flexi/${id}`,
    DELETE_FLEXI: (id: string) => `${endpointURL.prod}/days/flexi/${id}`,
//     EXCLUSIONS
    GET_EXCLUSIONS: (page: string, pageSize: string) => `${endpointURL.prod}/exclusions?page=${page}&pageSize=${pageSize}`,
    GET_EXCLUSION: (id: string) => `${endpointURL.prod}/exclusions/${id}`,
    ADD_EXCLUSION: `${endpointURL.prod}/exclusions`,
    EDIT_EXCLUSION: (id: string) => `${endpointURL.prod}/exclusions/${id}`,
    DELETE_EXCLUSION: (id: string) => `${endpointURL.prod}/exclusions/${id}`,
// ORDERS
    GET_ORDERS: (page: string, pageSize: string) => `${endpointURL.prod}/orders?page=${page}&pageSize=${pageSize}`,
    ADD_ORDER: `${endpointURL.prod}/orders`,
    GET_ORDER: (id: string) => `${endpointURL.prod}/orders/${id}`,
    GET_ORDERS_USER: (id: string) => `${endpointURL.prod}/orders/user?userId=${id}`,
    GET_ORDERS_DIET: (id: string) => `${endpointURL.prod}/orders/diet?dietId=${id}`,
    EDIT_ORDER: (id: string) => `${endpointURL.prod}/orders/${id}`,
    UPDATE_STATUS: (id: string) => `${endpointURL.prod}/orders/${id}`,
    DELETE_ORDER: (id: string) => `${endpointURL.prod}/orders/${id}`,

    CHECKOUT: `${endpointURL.prod}/payments/create-checkout-session`,
//     ADDRESSES
    GET_ADDRESSES: (page: string, pageSize: string) => `${endpointURL.prod}/address?page=${page}&pageSize=${pageSize}`,
    ADD_ADDRESS: `${endpointURL.prod}/address`,
    GET_ADDRESS: (id: string) => `${endpointURL.prod}/address/${id}`,
    GET_ADDRESSES_USER: (id: string) => `${endpointURL.prod}/address/user/${id}`,
    EDIT_ADDRESS: (id: string) => `${endpointURL.prod}/address/${id}`,
    DELETE_ADDRESS: (id: string) => `${endpointURL.prod}/address/${id}`,
//     REPORTS
    GET_REPORTS: (page: string, pageSize: string) => `${endpointURL.prod}/reports?page=${page}&pageSize=${pageSize}`,
    ADD_REPORT: `${endpointURL.prod}/reports`,
    GET_REPORTS_USER: (id: string, page: number, pageSize: number) => `${endpointURL.prod}/reports/user?userId=${id}&page=${page}&pageSize=${pageSize}`,
    GET_REPORT_ID: (id: string) => `${endpointURL.prod}/reports/${id}`,
    EDIT_REPORT: (id: string) => `${endpointURL.prod}/reports/${id}`,
    EDIT_REPORT_STATUS: (id: string, status: string) => `${endpointURL.prod}/reports/${id}?status=${status}`,
    DELETE_REPORT: (id: string) => `${endpointURL.prod}/reports/${id}`,
//     PROMOCODES
    GET_PROMOCODES: (page: string, pageSize: string) => `${endpointURL.prod}/promocode?page=${page}&pageSize=${pageSize}`,
    ADD_PROMOCODE: `${endpointURL.prod}/promocode/new`,
    GET_PROMOCODE_ID: (id: string) => `${endpointURL.prod}/promocode/${id}`,
    GET_PROMOCODE_NAME: (name: string, userId: string) => `${endpointURL.prod}/promocode/by-name/${name}?userId=${userId}`,
    EDIT_PROMOCODE: (id: string) => `${endpointURL.prod}/promocode/${id}`,
    DELETE_PROMOCODE: (id: string) => `${endpointURL.prod}/promocode/${id}`,
//     DELIVERY
    GET_DELIVERY: (page: string, pageSize: string) => `${endpointURL.prod}/delivery?page=${page}&pageSize=${pageSize}`,
    GET_DELIVERY_RANGE: (lat: number, lng: number) => `${endpointURL.prod}/delivery/search?lat=${lat}&lng=${lng}`,
    ADD_DELIVERY: `${endpointURL.prod}/delivery`,
    GET_DELIVERY_ID: (id: string) => `${endpointURL.prod}/delivery/${id}`,
    EDIT_DELIVERY: (id: string) => `${endpointURL.prod}/delivery/${id}`,
    DELETE_DELIVERY: (id: string) => `${endpointURL.prod}/delivery/${id}`,
//     DAILY ORDERS
    GET_DAILY: (page: string, pageSize: string) => `${endpointURL.prod}/daily?page=${page}&pageSize=${pageSize}`,
    GET_DAILY_DATE: (date: string) => `${endpointURL.prod}/daily/date?date=${date}`,
    ADD_DAILY: `${endpointURL.prod}/daily`,
//     PROGRESS
    GET_USER_PROGRESS: (userId: string) => `${endpointURL.prod}/entries/user?userId=${userId}`,
    ADD_ENTRY: (kind: string) => `${endpointURL.prod}/entries?kind=${kind}`,
    EDIT_ENTRY: (kind: string, date: string) => `${endpointURL.prod}/entries?kind=${kind}&date=${date}`,
    DELETE_ENTRY: (kind: string, date: string, userId: string) => `${endpointURL.prod}/entries?kind=${kind}&date=${date}&userId=${userId}`,
//     GEOCODING
    GEOCODE: (address: string) => `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${geoapiKey}`,
    REVERSE_GEO: (lat: number, lng:number) => `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&lang=pl&apiKey=${geoapiKey}
`,
//     PUSH
    CREATE_PUSH: `${endpointURL.prod}/push/create`,
    REMOVE_PUSH: `${endpointURL.prod}/push/remove`
}