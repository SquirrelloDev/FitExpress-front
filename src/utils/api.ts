import {isServer, QueryClient} from "@tanstack/react-query";
import axios, {AxiosInstance} from "axios";
import authStore from "../stores/authStore";

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
                authStore.getState().logout()
            }
            return error
        })
        return this.clientInstance.axiosInstance;
    }
}
export const apiRoutes = {
    LOGIN: 'http://localhost:3001/users/login/',
    REGISTER: 'http://localhost:3001/users',
    GET_USERS: (page: string, pageSize: string) => `http://localhost:3001/users?page=${page}&pageSize=${pageSize}`,
    GET_USER: (id: string) => `http://localhost:3001/users/${id}`,
    ADD_USER: `http://localhost:3001/users`,
    EDIT_USER: (id: string) => `http://localhost:3001/users/${id}`,
    UPDATE_HEALTH: `http://localhost:3001/users/hcard`,
    DELETE_USER: (id: string) => `http://localhost:3001/users/${id}`,
//     MEALS
    GET_MEALS: (page: string, pageSize: string) => `http://localhost:3001/meals?page=${page}&pageSize=${pageSize}`,
    ADD_MEAL: `http://localhost:3001/meals`,
    GET_MEAL: (id: string) => `http://localhost:3001/meals/${id}`,
    EDIT_MEAL: (id: string) => `http://localhost:3001/meals/${id}`,
    DELETE_MEAL: (id: string) => `http://localhost:3001/meals/${id}`,
//     TAGS
    GET_TAGS: (page: string, pageSize: string) => `http://localhost:3001/tags?page=${page}&pageSize=${pageSize}`,
    GET_TAG: (id: string) => `http://localhost:3001/tags/${id}`,
    ADD_TAG: `http://localhost:3001/tags`,
    EDIT_TAG: (id: string) => `http://localhost:3001/tags/${id}`,
    DELETE_TAG: (id: string) => `http://localhost:3001/tags/${id}`,
//     DIETS
    GET_DIETS: (page: string, pageSize: string, dietType: string) => `http://localhost:3001/diets?page=${page}&pageSize=${pageSize}&dietType=${dietType}`,
    ADD_DIET: `http://localhost:3001/diets`,
    GET_DIET: (id: string) => `http://localhost:3001/diets/${id}`,
    EDIT_DIET: (id: string) => `http://localhost:3001/diets/${id}`,
    DELETE_DIET: (id: string) => `http://localhost:3001/diets/${id}`,
//     FIXED
    GET_FIXEDS: (page: string, pageSize: string) => `http://localhost:3001/days/fixed?page=${page}&pageSize=${pageSize}`,
    ADD_FIXED: `http://localhost:3001/days/fixed`,
    GET_FIXED: (date: string) => `http://localhost:3001/days/fixed/day?date=${date}`,
    GET_FIXED_ID: (id: string) => `http://localhost:3001/days/fixed/${id}`,
    EDIT_FIXED: (id: string) => `http://localhost:3001/days/fixed/${id}`,
    DELETE_FIXED: (id: string) => `http://localhost:3001/days/fixed/${id}`,
//     FLEXI
    GET_FLEXIS: (page: string, pageSize: string) => `http://localhost:3001/days/flexi?page=${page}&pageSize=${pageSize}`,
    ADD_FLEXI: `http://localhost:3001/days/flexi`,
    GET_FLEXI: (date: string) => `http://localhost:3001/days/flexi/day?date=${date}`,
    GET_FLEXI_ID: (id: string) => `http://localhost:3001/days/flexi/${id}`,
    EDIT_FLEXI: (id: string) => `http://localhost:3001/days/flexi/${id}`,
    DELETE_FLEXI: (id: string) => `http://localhost:3001/days/flexi/${id}`,
//     EXCLUSIONS
    GET_EXCLUSIONS: (page: string, pageSize: string) => `http://localhost:3001/exclusions?page=${page}&pageSize=${pageSize}`,
    GET_EXCLUSION: (id: string) => `http://localhost:3001/exclusions/${id}`,
    ADD_EXCLUSION: `http://localhost:3001/exclusions`,
    EDIT_EXCLUSION: (id: string) => `http://localhost:3001/exclusions/${id}`,
    DELETE_EXCLUSION: (id: string) => `http://localhost:3001/exclusions/${id}`,
// ORDERS
    GET_ORDERS: (page: string, pageSize: string) => `http://localhost:3001/orders?page=${page}&pageSize=${pageSize}`,
    ADD_ORDER: `http://localhost:3001/orders`,
    GET_ORDER: (id: string) => `http://localhost:3001/orders/${id}`,
    GET_ORDERS_USER: (id: string) => `http://localhost:3001/orders/user?userId=${id}`,
    GET_ORDERS_DIET: (id: string) => `http://localhost:3001/orders/diet?dietId=${id}`,
    EDIT_ORDER: (id: string) => `http://localhost:3001/orders/${id}`,
    UPDATE_STATUS: (id: string) => `http://localhost:3001/orders/${id}`,
    DELETE_ORDER: (id: string) => `http://localhost:3001/orders/${id}`,

    CHECKOUT: `http://localhost:3001/payments/create-checkout-session`,
//     ADDRESSES
    GET_ADDRESSES: (page: string, pageSize: string) => `http://localhost:3001/address?page=${page}&pageSize=${pageSize}`,
    ADD_ADDRESS: `http://localhost:3001/address`,
    GET_ADDRESS: (id: string) => `http://localhost:3001/address/${id}`,
    GET_ADDRESSES_USER: (id: string) => `http://localhost:3001/address/user/${id}`,
    EDIT_ADDRESS: (id: string) => `http://localhost:3001/address/${id}`,
    DELETE_ADDRESS: (id: string) => `http://localhost:3001/address/${id}`,
//     REPORTS
    GET_REPORTS: (page: string, pageSize: string) => `http://localhost:3001/reports?page=${page}&pageSize=${pageSize}`,
    ADD_REPORT: `http://localhost:3001/reports`,
    GET_REPORTS_USER: (id: string) => `http://localhost:3001/reports/user?userId=${id}`,
    GET_REPORT_ID: (id: string) => `http://localhost:3001/reports/${id}`,
    EDIT_REPORT: (id: string) => `http://localhost:3001/reports/${id}`,
    EDIT_REPORT_STATUS: (id: string, status: string) => `http://localhost:3001/reports/${id}?status=${status}`,
    DELETE_REPORT: (id: string) => `http://localhost:3001/reports/${id}`,
//     PROMOCODES
    GET_PROMOCODES: (page: string, pageSize: string) => `http://localhost:3001/promocode?page=${page}&pageSize=${pageSize}`,
    ADD_PROMOCODE: `http://localhost:3001/promocode/new`,
    GET_PROMOCODE_ID: (id: string) => `http://localhost:3001/promocode/${id}`,
    GET_PROMOCODE_NAME: (name: string, userId: string) => `http://localhost:3001/promocode/by-name/${name}?userId=${userId}`,
    EDIT_PROMOCODE: (id: string) => `http://localhost:3001/promocode/${id}`,
    DELETE_PROMOCODE: (id: string) => `http://localhost:3001/promocode/${id}`,
//     DELIVERY
    GET_DELIVERY: (page: string, pageSize: string) => `http://localhost:3001/delivery?page=${page}&pageSize=${pageSize}`,
    ADD_DELIVERY: `http://localhost:3001/delivery`,
    GET_DELIVERY_ID: (id: string) => `http://localhost:3001/delivery/${id}`,
    EDIT_DELIVERY: (id: string) => `http://localhost:3001/delivery/${id}`,
    DELETE_DELIVERY: (id: string) => `http://localhost:3001/delivery/${id}`,
//     DAILY ORDERS
    GET_DAILY: (page: string, pageSize: string) => `http://localhost:3001/daily?page=${page}&pageSize=${pageSize}`,
    GET_DAILY_DATE: (date: string) => `http://localhost:3001/daily/date?date=${date}`,
    ADD_DAILY: 'http://localhost:3001/daily',
//     PROGRESS
    GET_USER_PROGRESS: (userId: string) => `http://localhost:3001/entries/user?userId=${userId}`,
    ADD_ENTRY: (kind: string) => `http://localhost:3001/entries?kind=${kind}`,
    EDIT_ENTRY: (kind: string, date: string) => `http://localhost:3001/entries?kind=${kind}&date=${date}`,
    DELETE_ENTRY: (kind: string, date: string, userId: string) => `http://localhost:3001/entries?kind=${kind}&date=${date}&userId=${userId}`
}