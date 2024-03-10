import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z, ZodString} from 'zod'
import errorMessages, {selectErrorMap} from "../../utils/errorMessages";
import {AxiosError} from "axios";
import {apiRoutes, FitExpressClient, queryClient} from "../../utils/api";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";

export const addressSchema = z.object({
    street: z.string().min(1, errorMessages.required),
    buildingNumber: z.string().min(1, errorMessages.required).max(8, 'Numer budynku jest za długi'),
    apartmentNumber: z.coerce.number().optional(),
    postal: z.string().regex(/^\d{2}-\d{3}$/, 'To nie wygląda jak kod pocztowy...'),
    city: z.string().min(1, errorMessages.required),
    voivodeship: z.string({errorMap: selectErrorMap}).min(1, errorMessages.required),
    isWeekend: z.boolean(),
    extraInfo: z.string().min(1, errorMessages.required)
})
export type AddressSchema = z.infer<typeof addressSchema>
export type AddressPostData = {
    address:{
        street: string,
        building_no: number,
        apartment_no?: number,
        postal: string,
        city: string,
        voivodeship: string,
        linked_points: ZodString['_output'][],
        is_weekend: boolean,
        extra_info: string
    }
    userId: string,
    token: string
}
export type AddressError = AxiosError<{errors: {general: string}}>
export type AddressResponse = {message: string}
const createAddress:MutationFunction<AddressResponse, AddressPostData> = async (address) => {
    const res = await FitExpressClient.getInstance().post<AddressResponse, AddressError>(apiRoutes.ADD_ADDRESS, {
        address:{
            ...address.address
        },
        userId: address.userId
    }, {headers: {Authorization: `Bearer ${address.token}`}})
    if(res.response?.status && res.response?.status !== 201){
        throw new Error('Coś poszło nie tak')
    }
    return { message: res.message }
}
function useAddressCreate(){
    const navigate = useNavigate();
    const {mutate, isError, isLoading, isSuccess, error} = useMutation<AddressResponse, AddressError, AddressPostData>(['Address-Create'], createAddress, {onSuccess: () => {
            toast.success('Adres dodany!');
            queryClient.invalidateQueries(['AddressesList'])
            navigate(`${appRoutes.profile}/${appRoutes.addresses}`);
        },
        onError: (error) => {
        toast.error(error.message)
        }})
    return {mutate, isError, isLoading, isSuccess, error}

}
export default useAddressCreate
