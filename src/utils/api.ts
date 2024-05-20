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
    LOGIN: `${endpointURL.dev}/users/login/`,
    REGISTER: `${endpointURL.dev}/users`,
    REQ_PASSWD: `${endpointURL.dev}/users/password-request`,
    NEW_PASSWD: (resetToken: string) => `${endpointURL.dev}/users/password?token=${resetToken}`,
    // USERS
    GET_USERS: (page: string, pageSize: string) => `${endpointURL.dev}/users?page=${page}&pageSize=${pageSize}`,
    GET_USER: (id: string) => `${endpointURL.dev}/users/${id}`,
    ADD_USER: `${endpointURL.dev}/users`,
    EDIT_USER: (id: string) => `${endpointURL.dev}/users/${id}`,
    UPDATE_HEALTH: `${endpointURL.dev}/users/hcard`,
    DELETE_USER: (id: string) => `${endpointURL.dev}/users/${id}`,
//     MEALS
    GET_MEALS: (page: string, pageSize: string) => `${endpointURL.dev}/meals?page=${page}&pageSize=${pageSize}`,
    ADD_MEAL: `${endpointURL.dev}/meals`,
    GET_MEAL: (id: string) => `${endpointURL.dev}/meals/${id}`,
    EDIT_MEAL: (id: string) => `${endpointURL.dev}/meals/${id}`,
    DELETE_MEAL: (id: string) => `${endpointURL.dev}/meals/${id}`,
//     TAGS
    GET_TAGS: (page: string, pageSize: string) => `${endpointURL.dev}/tags?page=${page}&pageSize=${pageSize}`,
    GET_TAG: (id: string) => `${endpointURL.dev}/tags/${id}`,
    ADD_TAG: `${endpointURL.dev}/tags`,
    EDIT_TAG: (id: string) => `${endpointURL.dev}/tags/${id}`,
    DELETE_TAG: (id: string) => `${endpointURL.dev}/tags/${id}`,
//     DIETS
    GET_DIETS: (page: string, pageSize: string, dietType: string) => `${endpointURL.dev}/diets?page=${page}&pageSize=${pageSize}&dietType=${dietType}`,
    ADD_DIET: `${endpointURL.dev}/diets`,
    GET_DIET: (id: string) => `${endpointURL.dev}/diets/${id}`,
    EDIT_DIET: (id: string) => `${endpointURL.dev}/diets/${id}`,
    DELETE_DIET: (id: string) => `${endpointURL.dev}/diets/${id}`,
//     FIXED
    GET_FIXEDS: (page: string, pageSize: string) => `${endpointURL.dev}/days/fixed?page=${page}&pageSize=${pageSize}`,
    ADD_FIXED: `${endpointURL.dev}/days/fixed`,
    GET_FIXED: (date: string) => `${endpointURL.dev}/days/fixed/day?date=${date}`,
    GET_FIXED_ID: (id: string) => `${endpointURL.dev}/days/fixed/${id}`,
    EDIT_FIXED: (id: string) => `${endpointURL.dev}/days/fixed/${id}`,
    DELETE_FIXED: (id: string) => `${endpointURL.dev}/days/fixed/${id}`,
//     FLEXI
    GET_FLEXIS: (page: string, pageSize: string) => `${endpointURL.dev}/days/flexi?page=${page}&pageSize=${pageSize}`,
    ADD_FLEXI: `${endpointURL.dev}/days/flexi`,
    GET_FLEXI: (date: string) => `${endpointURL.dev}/days/flexi/day?date=${date}`,
    GET_FLEXI_ID: (id: string) => `${endpointURL.dev}/days/flexi/${id}`,
    EDIT_FLEXI: (id: string) => `${endpointURL.dev}/days/flexi/${id}`,
    DELETE_FLEXI: (id: string) => `${endpointURL.dev}/days/flexi/${id}`,
//     EXCLUSIONS
    GET_EXCLUSIONS: (page: string, pageSize: string) => `${endpointURL.dev}/exclusions?page=${page}&pageSize=${pageSize}`,
    GET_EXCLUSION: (id: string) => `${endpointURL.dev}/exclusions/${id}`,
    ADD_EXCLUSION: `${endpointURL.dev}/exclusions`,
    EDIT_EXCLUSION: (id: string) => `${endpointURL.dev}/exclusions/${id}`,
    DELETE_EXCLUSION: (id: string) => `${endpointURL.dev}/exclusions/${id}`,
// ORDERS
    GET_ORDERS: (page: string, pageSize: string) => `${endpointURL.dev}/orders?page=${page}&pageSize=${pageSize}`,
    ADD_ORDER: `${endpointURL.dev}/orders`,
    GET_ORDER: (id: string) => `${endpointURL.dev}/orders/${id}`,
    GET_ORDERS_USER: (id: string) => `${endpointURL.dev}/orders/user?userId=${id}`,
    GET_ORDERS_DIET: (id: string) => `${endpointURL.dev}/orders/diet?dietId=${id}`,
    EDIT_ORDER: (id: string) => `${endpointURL.dev}/orders/${id}`,
    UPDATE_STATUS: (id: string) => `${endpointURL.dev}/orders/${id}`,
    DELETE_ORDER: (id: string) => `${endpointURL.dev}/orders/${id}`,

    CHECKOUT: `${endpointURL.dev}/payments/create-checkout-session`,
//     ADDRESSES
    GET_ADDRESSES: (page: string, pageSize: string) => `${endpointURL.dev}/address?page=${page}&pageSize=${pageSize}`,
    ADD_ADDRESS: `${endpointURL.dev}/address`,
    GET_ADDRESS: (id: string) => `${endpointURL.dev}/address/${id}`,
    GET_ADDRESSES_USER: (id: string) => `${endpointURL.dev}/address/user/${id}`,
    EDIT_ADDRESS: (id: string) => `${endpointURL.dev}/address/${id}`,
    DELETE_ADDRESS: (id: string) => `${endpointURL.dev}/address/${id}`,
//     REPORTS
    GET_REPORTS: (page: string, pageSize: string) => `${endpointURL.dev}/reports?page=${page}&pageSize=${pageSize}`,
    ADD_REPORT: `${endpointURL.dev}/reports`,
    GET_REPORTS_USER: (id: string, page: number, pageSize: number) => `${endpointURL.dev}/reports/user?userId=${id}&page=${page}&pageSize=${pageSize}`,
    GET_REPORT_ID: (id: string) => `${endpointURL.dev}/reports/${id}`,
    EDIT_REPORT: (id: string) => `${endpointURL.dev}/reports/${id}`,
    EDIT_REPORT_STATUS: (id: string, status: string) => `${endpointURL.dev}/reports/${id}?status=${status}`,
    DELETE_REPORT: (id: string) => `${endpointURL.dev}/reports/${id}`,
//     PROMOCODES
    GET_PROMOCODES: (page: string, pageSize: string) => `${endpointURL.dev}/promocode?page=${page}&pageSize=${pageSize}`,
    ADD_PROMOCODE: `${endpointURL.dev}/promocode/new`,
    GET_PROMOCODE_ID: (id: string) => `${endpointURL.dev}/promocode/${id}`,
    GET_PROMOCODE_NAME: (name: string, userId: string) => `${endpointURL.dev}/promocode/by-name/${name}?userId=${userId}`,
    EDIT_PROMOCODE: (id: string) => `${endpointURL.dev}/promocode/${id}`,
    DELETE_PROMOCODE: (id: string) => `${endpointURL.dev}/promocode/${id}`,
//     DELIVERY
    GET_DELIVERY: (page: string, pageSize: string) => `${endpointURL.dev}/delivery?page=${page}&pageSize=${pageSize}`,
    GET_DELIVERY_RANGE: (lat: number, lng: number) => `${endpointURL.dev}/delivery/search?lat=${lat}&lng=${lng}`,
    ADD_DELIVERY: `${endpointURL.dev}/delivery`,
    GET_DELIVERY_ID: (id: string) => `${endpointURL.dev}/delivery/${id}`,
    EDIT_DELIVERY: (id: string) => `${endpointURL.dev}/delivery/${id}`,
    DELETE_DELIVERY: (id: string) => `${endpointURL.dev}/delivery/${id}`,
//     DAILY ORDERS
    GET_DAILY: (page: string, pageSize: string) => `${endpointURL.dev}/daily?page=${page}&pageSize=${pageSize}`,
    GET_DAILY_DATE: (date: string) => `${endpointURL.dev}/daily/date?date=${date}`,
    ADD_DAILY: `${endpointURL.dev}/daily`,
//     PROGRESS
    GET_USER_PROGRESS: (userId: string) => `${endpointURL.dev}/entries/user?userId=${userId}`,
    ADD_ENTRY: (kind: string) => `${endpointURL.dev}/entries?kind=${kind}`,
    EDIT_ENTRY: (kind: string, date: string) => `${endpointURL.dev}/entries?kind=${kind}&date=${date}`,
    DELETE_ENTRY: (kind: string, date: string, userId: string) => `${endpointURL.dev}/entries?kind=${kind}&date=${date}&userId=${userId}`,
//     GEOCODING
    GEOCODE: (address: string) => `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${geoapiKey}`,
    REVERSE_GEO: (lat: number, lng:number) => `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&lang=pl&apiKey=${geoapiKey}
`,
//     PUSH
    CREATE_PUSH: `${endpointURL.dev}/push/create`,
    REMOVE_PUSH: `${endpointURL.prod}/push/remove`
}