import BackButton from "../../../../components/BackBtn/BackButton";
import {FormProvider, useForm, useWatch} from "react-hook-form";
import Input from "../../../../components/Input/Input";
import ControlledSelect from "../../../../components/Select/ControlledSelect";
import {SelectOption} from "../../../../components/Select/types";
import TextArea from "../../../../components/TextArea/TextArea";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import useAddressCreate, {AddressPostData, AddressSchema, addressSchema} from "../../../../queries/addresses/create";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuthStore from "../../../../stores/authStore";
import {useGeoCode} from "../../../../queries/delivery/geocoding";
import {useCallback, useEffect} from "react";
import {useDebouncedValue} from "@mantine/hooks";
import useDeliveryRange from "../../../../queries/delivery/listing";
import AddresAvailability from "../../../../components/AddressAvailability/AddresAvailability";
import classes from "../../../../sass/pages/address-form-page.module.scss";
import btnStyles from '../../../../sass/components/button.module.scss'
import inputStyles from '../../../../sass/components/text-input.module.scss'
import {TailSpin} from "react-loader-spinner";
import {IconCurrentLocation} from "@tabler/icons-react";
import {useMediaQuery} from "@mantine/hooks";
import useReverseGeocode from "../../../../hooks/useReverseGeocode";

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
export default function AddressCreate() {
    const userData = useAuthStore(state => state.userData)
    const {mutate, isLoading} = useAddressCreate()
    const methods = useForm({
        resolver: zodResolver(addressSchema),
        mode: 'onTouched'
    })
    const {handleSubmit, control, setValue} = methods
    const watch = useWatch({control: control, name: ['city', 'street', 'buildingNumber', 'postal', 'voivodeship']})
    const extraInfoWatch = useWatch({control: control, name: 'extraInfo'})
    const [debounced] = useDebouncedValue(watch as string[], 350)
    const matches = useMediaQuery('(display-mode: standalone)');
    const {
        data,
        refetch: geocodeAddress,
        isSuccess: isGeocodeSuccess
    } = useGeoCode({
        city: debounced[0],
        street: debounced[1],
        buildingNumber: debounced[2],
        postal: debounced[3],
        voivodeship: debounced[4]
    })
    const logPosition = useReverseGeocode(useCallback((data) => {
        setValue('city', data.data.results[0].city)
        setValue('street', data.data.results[0].street)
        setValue('buildingNumber', data.data.results[0].housenumber)
        setValue('postal', data.data.results[0].postcode)
        setValue('voivodeship', voivodeships.find(voivodeship => (voivodeship.value as string).toLowerCase() === data.data.results[0].state.split(' ')[1])?.value as string)
    }, [setValue]))
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
        const address: AddressPostData = {
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
            token: userData.token
        }
        mutate(address)
    }
    return (
        <section className={classes.page}>
            <BackButton/>
            <h2>Dodaj adres</h2>
            <FormProvider {...methods}>
                <div className={classes.page__form__wrapper}>
                {/*@ts-expect-error data are compatible*/}
                <form onSubmit={handleSubmit(onSubmit)} className={classes.page__form}>
                    <div className={classes.page__form__grid}>
                            <div className={classes.page__form__location}>
                                <Input name={'city'} placeholder={'Miasto'}/>
                                {matches && <button onClick={logPosition} type={'button'}
                                                    className={classes.page__form__location__btn}><IconCurrentLocation/>
                                </button>}
                            </div>
                            <div className={classes.page__form__street}>
                            <Input name={'street'} placeholder={'Ulica'}/>
                            </div>

                            <Input name={'buildingNumber'} placeholder={'Nr budynku'}/>
                            <Input name={'apartmentNumber'} placeholder={'Nr lokalu'}/>
                            <Input name={'postal'} placeholder={'Kod pocztowy'}/>
                            <ControlledSelect options={voivodeships} control={methods.control} name={'voivodeship'}
                                              placeholder={'Województwo'}/>

                    </div>
                    <AddresAvailability debouncedArr={debounced} inRange={deliveryData?.inRange}/>
                    <TextArea name={'extraInfo'} placeholder={'Dodatkowe informacje dla kuriera'}/>
                    <div className={classes.page__form__footer}>
                    <Checkbox name={'isWeekend'} placeholder={'Weekendy'} className={inputStyles.checkbox}/>
                    <button type={'submit'}
                            disabled={(isFetching || !deliveryData?.inRange || extraInfoWatch === '' || isLoading)}
                            className={btnStyles.btn}>{isLoading ? <TailSpin/> : 'Zapisz'}</button>
                    </div>

                </form>
                </div>
            </FormProvider>
        </section>
    )
}