import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z} from 'zod'
import errorMessages from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {loadStripe} from "@stripe/stripe-js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const dateErrorMap: z.ZodErrorMap = (error) => {
    if (error.code === z.ZodIssueCode.invalid_date) {
        return { message: errorMessages.required }
    }
    return null
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const selectErrorMap: z.ZodErrorMap = (error) => {
    if (error.code === z.ZodIssueCode.invalid_type) {
        return { message: errorMessages.required }
    }
    return null
}
export const orderSchema = z.object({
    name: z.string().min(1, errorMessages.required),
    dietId: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    userId: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    addressId: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    subDateFrom: z.coerce.date({errorMap: dateErrorMap}),
    subDateTo: z.coerce.date({errorMap: dateErrorMap}),
    price: z.coerce.number().min(1, errorMessages.required),
    calories: z.coerce.number().min(1, errorMessages.required),
    withWeekends: z.boolean(),
})
    .refine((schema) => {
        const subDateFrom = new Date(schema.subDateFrom.getTime()).setHours(1,0,0,0)

        const subDateTo = new Date(schema.subDateTo.getTime()).setHours(1,0,0,0)
        return subDateFrom < subDateTo
    }, {
        path: ['subDateFrom'],
        message: 'Niepoprawny zakres dat'
    })
export const cartSchema = z.object({
    address: z.string().min(1, "Wybierz adres"),
    cart: z.array(z.object({
        name: z.string(),
        calories: z.number(),
        weekends: z.boolean(),
        date: z.array(z.coerce.date()),
        price: z.number(),
        flexiTier: z.number().optional()
    }))
});
export type CartSchema = z.infer<typeof cartSchema>;
export type OrderSchema = z.infer<typeof orderSchema>
export type OrderPostData = {
    order:{
        name: string,
        dietId: string,
        userId: string,
        addressId: string,
        subDate: {
            from: Date,
            to: Date
        }
        price: number,
        calories: number,
        withWeekends: boolean,
        flexiTier?: number
    }
    token: string
}
export type OrderError = AxiosError<{errors: {general: string}}>
export type OrderResponse = {message: string}
const createOrder:MutationFunction<OrderResponse, OrderPostData> = async (order) => {
    const res = await FitExpressClient.getInstance().post<OrderResponse, OrderError>(apiRoutes.ADD_ORDER, {
        ...order.order
    }, {headers: {Authorization: `Bearer ${order.token}`}})
    if(res.response?.status && res.response?.status !== 201){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
type PaymentResponse = {
    id: string
}
const proccessPayment:MutationFunction<PaymentResponse, OrderPostData[]> = async (order) => {
    const stripe = await loadStripe('pk_test_51OjkX2IEJEI12bS3vAJpQ4Ftps8jjf5ZrNgZs7o2iqFHJCrdQxUHzUigomsI4h7D7PrEUQ6ymIFq8MGQcoVzeXMD00rOc7T4u0')

    const res = await FitExpressClient.getInstance().post<PaymentResponse>(apiRoutes.CHECKOUT, {
        orders: order
    }, {headers: {Authorization: `Bearer ${order[0].token}`}})
    const result = stripe!.redirectToCheckout({
        sessionId: res.data.id
    })
    if((await result).error){
        console.log((await result).error)
    }
    return res.data
}

function useOrderCreate(){
    // const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<OrderResponse, OrderError, OrderPostData>(['Order-Create'], createOrder, {onSuccess: () => {
            toast.success('Zamówienie dodane!');
            queryClient.invalidateQueries(['OrdersList'])
            // navigate(appRoutes.orders);
        },
        onError: (error) => {
        toast.error(error.message)
        }
    })
    return {mutate, isError, isLoading, isSuccess, error}

}
export function usePaymentProcess(){
    const {mutate, isLoading, isSuccess, isError, error} = useMutation(['Payment-checkout'], proccessPayment)
    return {mutate,isLoading, isSuccess, isError, error}
}
export default useOrderCreate
