import {Control, Controller, FieldValues, Path, useFormContext} from "react-hook-form";
import Checkbox from "../../Checkbox/Checkbox";
import inputStyles from '../../../sass/components/text-input.module.scss'
import ControlledRangedDatePicker from "../../Datepicker/ControlledRangedDatePicker";
import {useEffect} from "react";
interface CartSubDateProps<T extends FieldValues> {
	name: string
	control: Control<T, unknown>,
}
function CartSubDate<T extends FieldValues>({name, control}: CartSubDateProps<T>) {
	const {
		formState: { errors },
		getValues,
		watch
	} = useFormContext()
	const withWeekends = watch(`${name}-weekends`)
	const subDate = watch(`${name}-date`)
	useEffect(() => {
		console.log(subDate)
	}, [subDate])
	return (
		<>
		<Controller control={control} name={`${name}-weekends` as Path<T>} render={() => (
			<div>
				<Checkbox name={`${name}-weekends`} placeholder={'Czy dieta ma być dostarczana w weekend?'} className={inputStyles.checkbox}/>
			</div>
		)}/>
			<ControlledRangedDatePicker control={control} name={`${name}-date`} inline filterDate={!withWeekends ? (date) => {
				const weekDay = new Date(date).getDay()
				return weekDay !== 0 && weekDay !== 6
			} : null
			} calendarStartDay={1}/>
			<div>
				<p>Wybrany okres: {`${new Date(subDate[0]).toLocaleDateString()} - ${subDate[1] !== null ? new Date(subDate[1]).toLocaleDateString() : ''}`}</p>
				<p>Cena:</p>
			</div>
		</>
	)
}
export default CartSubDate