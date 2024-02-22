import {FormProvider, useForm} from "react-hook-form";
import ControlledDatePicker from "../../Datepicker/ControlledDatePicker";
import Input from "../../Input/Input";
import useProgressCreate, {
    ProgressData,
    waterSchema,
    WaterSchema, weightSchema,
    WeightSchema
} from "../../../queries/progress-entry/create";
import {TailSpin} from "react-loader-spinner";
import btnStyles from '../../../sass/components/button.module.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {DevTool} from "@hookform/devtools";
import {queryClient} from "../../../utils/api";
import useProgressPatch from "../../../queries/progress-entry/edit";
import classes from "../../../sass/components/entry-sheet.module.scss";


interface WeightEditSheetProps {
    id: string,
    token: string,
    close: () => void,
    dates: Date[],
    defValue: {date: Date, weight: number}
}

function WeightEditSheet({id, token, close, dates, defValue}: WeightEditSheetProps) {
    const {mutate, isLoading} = useProgressPatch(() => {
        queryClient.invalidateQueries(['List-Progress'])
        close()
    })
    const methods = useForm({
        resolver: zodResolver(weightSchema),
        defaultValues: {
            date: defValue.date,
            weight: defValue.weight
        }
    })
    const {handleSubmit} = methods
    // Custom filter function
    const isDateDisabled = (date) => {
        // Check if the date is in the array of disabled dates
        return !dates.some((disabledDate) => {
            return (
                disabledDate.getDate() === date.getDate() &&
                disabledDate.getMonth() === date.getMonth() &&
                disabledDate.getFullYear() === date.getFullYear()
            );
        });
    };
    const onSubmit = (data: WeightSchema) => {
        const newEntry: ProgressData = {
            kind: "weight",
            data: {
                date: data.date,
                weight: Number(data.weight)
            },
            token,
            id
        }
        mutate(newEntry)
    }
    return (
        <FormProvider {...methods}>
            <h3>Edytuj wagę</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <ControlledDatePicker control={methods.control} name={'date'} placeholderText={'Data'} maxDate={new Date()} filterDate={isDateDisabled}/>
                <Input type={'number'} min={0} max={5000} placeholder={'Waga w kg'} name={'weight'}/>
                <button type={'submit'} disabled={isLoading} className={btnStyles.btn}>{isLoading ? <TailSpin/> : 'Zapisz'}</button>
            </form>
        </FormProvider>
    )
}

export default WeightEditSheet