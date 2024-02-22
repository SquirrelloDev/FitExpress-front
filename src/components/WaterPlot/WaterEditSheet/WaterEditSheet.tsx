import {FormProvider, useForm} from "react-hook-form";
import ControlledDatePicker from "../../Datepicker/ControlledDatePicker";
import Input from "../../Input/Input";
import {ProgressData, waterSchema, WaterSchema} from "../../../queries/progress-entry/create";
import {TailSpin} from "react-loader-spinner";
import btnStyles from '../../../sass/components/button.module.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {queryClient} from "../../../utils/api";
import useProgressPatch from "../../../queries/progress-entry/edit";
import classes from "../../../sass/components/entry-sheet.module.scss";

interface WaterEditSheetProps {
    id: string,
    token: string,
    close: () => void,
    dates: Date[],
    defValue: {date: Date, water: number}
}

function WaterEditSheet({id, token, close, dates, defValue}: WaterEditSheetProps) {
    const {mutate, isLoading} = useProgressPatch(() => {
        queryClient.invalidateQueries(['List-Progress'])
        close()
    })
    const methods = useForm({
        resolver: zodResolver(waterSchema),
        defaultValues: {
            date: defValue.date,
            water: defValue.water
        }
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
                date: data.date,
                water: Number(data.water)
            },
            token,
            id
        }
        mutate(newEntry)
    }
    return (
        <FormProvider {...methods}>
            <h3>Edytuj wodę</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <ControlledDatePicker control={methods.control} name={'date'} placeholderText={'Data'} maxDate={new Date()} filterDate={isDateDisabled}/>
                <Input type={'number'} min={0} max={5000} placeholder={'Woda w ml'} name={'water'}/>
                <button type={'submit'} disabled={isLoading} className={btnStyles.btn}>{isLoading ? <TailSpin/> : 'Zapisz'}</button>
            </form>
        </FormProvider>
    )
}

export default WaterEditSheet