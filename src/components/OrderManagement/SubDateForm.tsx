import {FormProvider, useForm} from "react-hook-form";
import clsx from "clsx";
import btnStyles from "../../sass/components/button.module.scss";
import ControlledRangedDatePicker from "../Datepicker/ControlledRangedDatePicker";
interface SubDateFormProps {
	subDate: {
		from: string,
		to: string
	}
}
function SubDateForm({subDate}:SubDateFormProps) {
	const methods = useForm()
	const { handleSubmit } = methods
	const onSubmit = () => {

	}
	return (
		<FormProvider {...methods}>
			<h2>Zmień terminarz diety</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ControlledRangedDatePicker control={methods.control} name={'subDate'} inline startDate={new Date(subDate.from)} endDate={new Date(subDate.to)}/>
				<button className={clsx(btnStyles.btn)} type={'submit'}>Potwierdź</button>
			</form>
		</FormProvider>
	)
}
export default SubDateForm