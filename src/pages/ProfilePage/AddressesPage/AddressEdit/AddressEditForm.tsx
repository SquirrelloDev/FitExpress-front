import {FormProvider, useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddressPostData, AddressSchema, addressSchema} from "../../../../queries/addresses/create";
import {useDebouncedValue} from "@mantine/hooks";
import {useGeoCode} from "../../../../queries/delivery/geocoding";
import useDeliveryRange from "../../../../queries/delivery/listing";
import {useEffect} from "react";
import BackButton from "../../../../components/BackBtn/BackButton";
import Input from "../../../../components/Input/Input";
import ControlledSelect from "../../../../components/Select/ControlledSelect";
import AddresAvailability from "../../../../components/AddressAvailability/AddresAvailability";
import TextArea from "../../../../components/TextArea/TextArea";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import {DevTool} from "@hookform/devtools";
import {SelectOption} from "../../../../components/Select/types";
import useAddressEdit from "../../../../queries/addresses/edit";
import {Address} from "../../../../types/dbtypes/Address";
import {UserData} from "../../../../types/dbtypes/UserData";

const voivodeships: SelectOption[] = [
    {label: 'Zachodniopomorskie', value: 'Zachodniopomorskie'},
    {label: 'Pomorskie', value: 'Pomorskie'},
    {label: 'Kujawsko-Pomorskie', value: 'Kujawsko-Pomorskie'},
    {label: 'Warmińsko-Mazurskie', value: 'Warmińsko-Mazurskie'},
    {label: 'Podlaskie', value: 'Podlaskie'},
    {label: 'Lubuskie', value: 'Lubuskie'},
    {label: 'Wielkopolskie', value: 'Wielkopolskie'},
    {label: 'Łódzkie', value: 'Łódzkie'},
    {label: 'Mazowieckie', value: 'Mazowieckie'},
    {label: 'Świętokrzyskie', value: 'Świętokrzyskie'},
    {label: 'Lubelskie', value: 'Lubelskie'},
    {label: 'Dolnośląskie', value: 'Dolnośląskie'},
    {label: 'Opolskie', value: 'Opolskie'},
    {label: 'Śląskie', value: 'Śląskie'},
    {label: 'Małopolskie', value: 'Małopolskie'},
    {label: 'Podkarpackie', value: 'Podkarpackie'},
]
interface AddressEditFormProps {
    addressData: Address,
    userData: UserData,
}
export default function AddressEditForm({addressData, userData}:AddressEditFormProps) {
    const {mutate, isLoading} = useAddressEdit()
    const methods = useForm({
        resolver: zodResolver(addressSchema),
        mode: 'onTouched',
        defaultValues: {
            city: addressData.city,
            street: addressData.street,
            buildingNumber: addressData.building_no,
            apartmentNumber: addressData.apartment_no,
            postal: addressData.postal,
            voivodeship: addressData.voivodeship,
            isWeekend: addressData.is_weekend,
            extraInfo: addressData.extra_info
        }
    })
    const {handleSubmit, control} = methods
    const watch = useWatch({control: control, name: ['city', 'street', 'buildingNumber', 'postal', 'voivodeship']})
    const extraInfoWatch = useWatch({control: control, name: 'extraInfo'})
    const [debounced] = useDebouncedValue(watch as string[], 350)
    const {
        data,
        refetch: geocodeAddress,
        isSuccess: isGeocodeSuccess
    } = useGeoCode({
        city: debounced[0],
        street: debounced[1],
        buildingNumber: Number(debounced[2]),
        postal: debounced[3],
        voivodeship: debounced[4]
    })
    const {data: deliveryData, refetch, isFetching} = useDeliveryRange({
        lat: data?.data.features[0].properties.lat,
        lng: data?.data.features[0].properties.lon,
        token: userData.token
    })
    useEffect(() => {
        if (debounced.every(value => value)) {
            geocodeAddress()
        }
        if (isGeocodeSuccess) {
            refetch()
        }
    }, [geocodeAddress, debounced, isGeocodeSuccess, refetch])
    const onSubmit = (data: AddressSchema) => {
        console.log(data)
        const address: AddressPostData & {id: string} = {
            address: {
                street: data.street,
                building_no: data.buildingNumber,
                apartment_no: data.apartmentNumber,
                postal: data.postal,
                city: data.city,
                linked_points: [...deliveryData!.allowedPoints],
                is_weekend: data.isWeekend,
                extra_info: data.extraInfo,
                voivodeship: data.voivodeship
            },
            userId: userData.id,
            token: userData.token,
            id: addressData._id
        }
        console.log(address)
        mutate(address)
    }
    return (
        <section style={{paddingBottom: '70px'}}>
            <BackButton/>
            <h2>Edytuj adres</h2>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input name={'city'} placeholder={'Miasto'}/>
                        {/*Uncomment when making pwa <button><IconCurrentLocation /></button>*/}
                    </div>
                    <Input name={'street'} placeholder={'Ulica'}/>
                    <div>
                        <Input name={'buildingNumber'} placeholder={'Nr budynku'}/>
                        <Input name={'apartmentNumber'} placeholder={'Nr lokalu'}/>
                    </div>
                    <Input name={'postal'} placeholder={'Kod pocztowy'}/>
                    <ControlledSelect options={voivodeships} control={methods.control} name={'voivodeship'}
                                      placeholder={'Województwo'}/>
                    <AddresAvailability debouncedArr={debounced} inRange={deliveryData?.inRange}/>
                    <TextArea name={'extraInfo'} placeholder={'Dodatkowe informacje dla kuriera'}/>
                    <Checkbox name={'isWeekend'} placeholder={'Weekendy'}/>

                    <button type={'submit'}
                            disabled={(isFetching || !deliveryData?.inRange || extraInfoWatch === '' || isLoading)}>Zapisz
                    </button>

                </form>
            </FormProvider>
            <DevTool control={control}/>
        </section>
    )
}