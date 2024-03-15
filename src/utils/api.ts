import {isServer, QueryClient} from "@tanstack/react-query";
import axios, {AxiosInstance} from "axios";
import authStore from "../stores/authStore";
import {toast} from "react-hot-toast";

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
    LOGIN: `https://fitexpress-back.onrender.com/users/login/`,
    REGISTER: `https://fitexpress-back.onrender.com/users`,
    REQ_PASSWD: `https://fitexpress-back.onrender.com/users/password-request`,
    NEW_PASSWD: (resetToken: string) => `https://fitexpress-back.onrender.com/users/password?token=${resetToken}`,
    // USERS
    GET_USERS: (page: string, pageSize: string) => `https://fitexpress-back.onrender.com/users?page=${page}&pageSize=${pageSize}`,
    GET_USER: (id: string) => `https://fitexpress-back.onrender.com/users/${id}`,
    ADD_USER: `https://fitexpress-back.onrender.com/users`,
    EDIT_USER: (id: string) => `https://fitexpress-back.onrender.com/users/${id}`,
    UPDATE_HEALTH: `https://fitexpress-back.onrender.com/users/hcard`,
    DELETE_USER: (id: string) => `https://fitexpress-back.onrender.com/users/${id}`,
//     MEALS
    GET_MEALS: (page: string, pageSize: string) => `https://fitexpress-back.onrender.com/meals?page=${page}&pageSize=${pageSize}`,
    ADD_MEAL: `https://fitexpress-back.onrender.com/meals`,
    GET_MEAL: (id: string) => `https://fitexpress-back.onrender.com/meals/${id}`,
    EDIT_MEAL: (id: string) => `https://fitexpress-back.onrender.com/meals/${id}`,
    DELETE_MEAL: (id: string) => `https://fitexpress-back.onrender.com/meals/${id}`,
//     TAGS
    GET_TAGS: (page: string, pageSize: string) => `https://fitexpress-back.onrender.com/tags?page=${page}&pageSize=${pageSize}`,
    GET_TAG: (id: string) => `https://fitexpress-back.onrender.com/tags/${id}`,
    ADD_TAG: `https://fitexpress-back.onrender.com/tags`,
    EDIT_TAG: (id: string) => `https://fitexpress-back.onrender.com/tags/${id}`,
    DELETE_TAG: (id: string) => `https://fitexpress-back.onrender.com/tags/${id}`,
//     DIETS
    GET_DIETS: (page: string, pageSize: string, dietType: string) => `https://fitexpress-back.onrender.com/diets?page=${page}&pageSize=${pageSize}&dietType=${dietType}`,
    ADD_DIET: `https://fitexpress-back.onrender.com/diets`,
    GET_DIET: (id: string) => `https://fitexpress-back.onrender.com/diets/${id}`,
    EDIT_DIET: (id: string) => `https://fitexpress-back.onrender.com/diets/${id}`,
    DELETE_DIET: (id: string) => `https://fitexpress-back.onrender.com/diets/${id}`,
//     FIXED
    GET_FIXEDS: (page: string, pageSize: string) => `https://fitexpress-back.onrender.com/days/fixed?page=${page}&pageSize=${pageSize}`,
    ADD_FIXED: `https://fitexpress-back.onrender.com/days/fixed`,
    GET_FIXED: (date: string) => `https://fitexpress-back.onrender.com/days/fixed/day?date=${date}`,
    GET_FIXED_ID: (id: string) => `https://fitexpress-back.onrender.com/days/fixed/${id}`,
    EDIT_FIXED: (id: string) => `https://fitexpress-back.onrender.com/days/fixed/${id}`,
    DELETE_FIXED: (id: string) => `https://fitexpress-back.onrender.com/days/fixed/${id}`,
//     FLEXI
    GET_FLEXIS: (page: string, pageSize: string) => `https://fitexpress-back.onrender.com/days/flexi?page=${page}&pageSize=${pageSize}`,
    ADD_FLEXI: `https://fitexpress-back.onrender.com/days/flexi`,
    GET_FLEXI: (date: string) => `https://fitexpress-back.onrender.com/days/flexi/day?date=${date}`,
    GET_FLEXI_ID: (id: string) => `https://fitexpress-back.onrender.com/days/flexi/${id}`,
    EDIT_FLEXI: (id: string) => `https://fitexpress-back.onrender.com/days/flexi/${id}`,
    DELETE_FLEXI: (id: string) => `https://fitexpress-back.onrender.com/days/flexi/${id}`,
//     EXCLUSIONS
    GET_EXCLUSIONS: (page: string, pageSize: string) => `https://fitexpress-back.onrender.com/exclusions?page=${page}&pageSize=${pageSize}`,
    GET_EXCLUSION: (id: string) => `https://fitexpress-back.onrender.com/exclusions/${id}`,
    ADD_EXCLUSION: `https://fitexpress-back.onrender.com/exclusions`,
    EDIT_EXCLUSION: (id: string) => `https://fitexpress-back.onrender.com/exclusions/${id}`,
    DELETE_EXCLUSION: (id: string) => `https://fitexpress-back.onrender.com/exclusions/${id}`,
// ORDERS
    GET_ORDERS: (page: string, pageSize: string) => `https://fitexpress-back.onrender.com/orders?page=${page}&pageSize=${pageSize}`,
    ADD_ORDER: `https://fitexpress-back.onrender.com/orders`,
    GET_ORDER: (id: string) => `https://fitexpress-back.onrender.com/orders/${id}`,
    GET_ORDERS_USER: (id: string) => `https://fitexpress-back.onrender.com/orders/user?userId=${id}`,
    GET_ORDERS_DIET: (id: string) => `https://fitexpress-back.onrender.com/orders/diet?dietId=${id}`,
    EDIT_ORDER: (id: string) => `https://fitexpress-back.onrender.com/orders/${id}`,
    UPDATE_STATUS: (id: string) => `https://fitexpress-back.onrender.com/orders/${id}`,
    DELETE_ORDER: (id: string) => `https://fitexpress-back.onrender.com/orders/${id}`,

    CHECKOUT: `https://fitexpress-back.onrender.com/payments/create-checkout-session`,
//     ADDRESSES
    GET_ADDRESSES: (page: string, pageSize: string) => `https://fitexpress-back.onrender.com/address?page=${page}&pageSize=${pageSize}`,
    ADD_ADDRESS: `https://fitexpress-back.onrender.com/address`,
    GET_ADDRESS: (id: string) => `https://fitexpress-back.onrender.com/address/${id}`,
    GET_ADDRESSES_USER: (id: string) => `https://fitexpress-back.onrender.com/address/user/${id}`,
    EDIT_ADDRESS: (id: string) => `https://fitexpress-back.onrender.com/address/${id}`,
    DELETE_ADDRESS: (id: string) => `https://fitexpress-back.onrender.com/address/${id}`,
//     REPORTS
    GET_REPORTS: (page: string, pageSize: string) => `https://fitexpress-back.onrender.com/reports?page=${page}&pageSize=${pageSize}`,
    ADD_REPORT: `https://fitexpress-back.onrender.com/reports`,
    GET_REPORTS_USER: (id: string, page: number, pageSize: number) => `https://fitexpress-back.onrender.com/reports/user?userId=${id}&page=${page}&pageSize=${pageSize}`,
    GET_REPORT_ID: (id: string) => `https://fitexpress-back.onrender.com/reports/${id}`,
    EDIT_REPORT: (id: string) => `https://fitexpress-back.onrender.com/reports/${id}`,
    EDIT_REPORT_STATUS: (id: string, status: string) => `https://fitexpress-back.onrender.com/reports/${id}?status=${status}`,
    DELETE_REPORT: (id: string) => `https://fitexpress-back.onrender.com/reports/${id}`,
//     PROMOCODES
    GET_PROMOCODES: (page: string, pageSize: string) => `https://fitexpress-back.onrender.com/promocode?page=${page}&pageSize=${pageSize}`,
    ADD_PROMOCODE: `https://fitexpress-back.onrender.com/promocode/new`,
    GET_PROMOCODE_ID: (id: string) => `https://fitexpress-back.onrender.com/promocode/${id}`,
    GET_PROMOCODE_NAME: (name: string, userId: string) => `https://fitexpress-back.onrender.com/promocode/by-name/${name}?userId=${userId}`,
    EDIT_PROMOCODE: (id: string) => `https://fitexpress-back.onrender.com/promocode/${id}`,
    DELETE_PROMOCODE: (id: string) => `https://fitexpress-back.onrender.com/promocode/${id}`,
//     DELIVERY
    GET_DELIVERY: (page: string, pageSize: string) => `https://fitexpress-back.onrender.com/delivery?page=${page}&pageSize=${pageSize}`,
    GET_DELIVERY_RANGE: (lat: number, lng: number) => `https://fitexpress-back.onrender.com/delivery/search?lat=${lat}&lng=${lng}`,
    ADD_DELIVERY: `https://fitexpress-back.onrender.com/delivery`,
    GET_DELIVERY_ID: (id: string) => `https://fitexpress-back.onrender.com/delivery/${id}`,
    EDIT_DELIVERY: (id: string) => `https://fitexpress-back.onrender.com/delivery/${id}`,
    DELETE_DELIVERY: (id: string) => `https://fitexpress-back.onrender.com/delivery/${id}`,
//     DAILY ORDERS
    GET_DAILY: (page: string, pageSize: string) => `https://fitexpress-back.onrender.com/daily?page=${page}&pageSize=${pageSize}`,
    GET_DAILY_DATE: (date: string) => `https://fitexpress-back.onrender.com/daily/date?date=${date}`,
    ADD_DAILY: 'https://fitexpress-back.onrender.com/daily',
//     PROGRESS
    GET_USER_PROGRESS: (userId: string) => `https://fitexpress-back.onrender.com/entries/user?userId=${userId}`,
    ADD_ENTRY: (kind: string) => `https://fitexpress-back.onrender.com/entries?kind=${kind}`,
    EDIT_ENTRY: (kind: string, date: string) => `https://fitexpress-back.onrender.com/entries?kind=${kind}&date=${date}`,
    DELETE_ENTRY: (kind: string, date: string, userId: string) => `https://fitexpress-back.onrender.com/entries?kind=${kind}&date=${date}&userId=${userId}`,
//     GEOCODING
    GEOCODE: (address: string) => `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${geoapiKey}`,
    REVERSE_GEO: (lat: number, lng:number) => `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&lang=pl&apiKey=${geoapiKey}
`
}