import useProgressCreate, {ProgressData, WeightSchema, weightSchema} from "../../../queries/progress-entry/create";
import {queryClient} from "../../../utils/api";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ControlledDatePicker from "../../Datepicker/ControlledDatePicker";
import Input from "../../Input/Input";
import btnStyles from "../../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {startOfDay} from "date-fns";

interface WeightAddSheetProps {
	id: string,
	token: string,
	close: () => void,
	dates: Date[]
}
function WeightAddSheet({id, token, close, dates}: WeightAddSheetProps) {
	const {mutate, isLoading} = useProgressCreate(() => {
		queryClient.invalidateQueries(['List-Progress'])
		close()
	})
	const methods = useForm({
		resolver: zodResolver(weightSchema),
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
	const onSubmit = (data: WeightSchema) => {
		const newEntry: ProgressData = {
			kind: "weight",
			data: {
				date: startOfDay(data.date),
				weight: Number(data.weight)
			},
			token,
			id
		}
		mutate(newEntry)
	}
	return (
		<FormProvider {...methods}>
			<h3>Dodaj wagę</h3>
			{/*@ts-expect-error data types are correct*/}
			<form onSubmit={handleSubmit(onSubmit)}>
				<ControlledDatePicker control={methods.control} name={'date'} placeholderText={'Data'} maxDate={new Date()} filterDate={isDateDisabled}/>
				<Input type={'number'} min={0} max={450} placeholder={'Waga w kg'} name={'weight'}/>

				<button type={'submit'} disabled={isLoading} className={btnStyles.btn}>{isLoading ? <TailSpin width={20} height={20}/> : 'Zapisz'}</button>
			</form>
		</FormProvider>
	)
}
export default WeightAddSheet