import {FormProvider, useForm} from "react-hook-form";
import ControlledDatePicker from "../../Datepicker/ControlledDatePicker";
import Input from "../../Input/Input";
import useProgressCreate, {ProgressData, waterSchema, WaterSchema} from "../../../queries/progress-entry/create";
import {TailSpin} from "react-loader-spinner";
import btnStyles from '../../../sass/components/button.module.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {queryClient} from "../../../utils/api";
import {parseIntoMidnight} from "../../../utils/dates";

interface WaterAddSheetProps {
    id: string,
    token: string,
    close: () => void,
    dates: Date[]
}

function WaterAddSheet({id, token, close, dates}: WaterAddSheetProps) {
    const {mutate, isLoading} = useProgressCreate(() => {
        queryClient.invalidateQueries(['List-Progress'])
        close()
    })
    const methods = useForm({
        resolver: zodResolver(waterSchema),
    })
    const {handleSubmit} = methods
    // Custom filter function
    const isDateDisabled = (date: Date) => {
        // Check if the date is in the array of disabled dates
        return !dates.some((disabledDate) => {
            return (
                disabledDate.getDate() === date.getDate() &&
                disabledDate.getMonth() === date.getMonth() &&
                disabledDate.getFullYear() === date.getFullYear()
            );
        });
    };
    const onSubmit = (data: WaterSchema) => {
        const newEntry: ProgressData = {
            kind: "water",
            data: {
                date: parseIntoMidnight(data.date),
                water: Number(data.water)
            },
            token,
            id
        }
        mutate(newEntry)
    }
    return (
        <FormProvider {...methods}>
            <h3>Dodaj wodę</h3>
            {/*@ts-expect-error data types are correct*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                <ControlledDatePicker control={methods.control} name={'date'} placeholderText={'Data'} maxDate={new Date()} filterDate={isDateDisabled}/>
                <Input type={'number'} min={0} max={5000} placeholder={'Woda w ml'} name={'water'}/>

                <button type={'submit'} disabled={isLoading} className={btnStyles.btn}>{isLoading ? <TailSpin width={20} height={20}/> : 'Zapisz'}</button>
            </form>
        </FormProvider>
    )
}

export default WaterAddSheet