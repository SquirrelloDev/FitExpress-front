import {Meal} from "../../types/dbtypes/Meal";
import {FormProvider, useForm} from "react-hook-form";
import {parseIntoMidnight} from "../../utils/dates";
import useAuthStore from "../../stores/authStore";
import useDailyCreate, {DailyPutData, dailySchema, DailySchema} from "../../queries/daily-orders/create";
import FlexiMealSelectable from "../FlexiMealSelectable/FlexiMealSelectable";
import {zodResolver} from "@hookform/resolvers/zod";

interface FlexiSelectionProps {
	dayPartMeals: Meal[]
	dayPartIdx: number
	orderId: string
	dietId: string
	currentDateListing: Date,
	selectedMeals: string[]
}
export default function FlexiSelection({dayPartMeals, dayPartIdx, dietId, orderId, currentDateListing, selectedMeals}:FlexiSelectionProps) {
	const userData = useAuthStore(state => state.userData)
	const {mutate} = useDailyCreate()
	const methods = useForm({
		defaultValues: {
			orderId: orderId,
			date: parseIntoMidnight(currentDateListing),
			userId: userData.id,
			dietId: dietId,
		},
		resolver: zodResolver(dailySchema)
	})
	const {handleSubmit, control} = methods
	const onSubmit = (data: DailySchema) =>{
		const helperArr = selectedMeals
		helperArr[dayPartIdx] = data.mealId
		const obj:DailyPutData = {
			date: parseIntoMidnight(currentDateListing),
			orderId,
			userId: userData.id,
			dietId,
			selectedMeals: helperArr,
			token: userData.token
		}
		mutate(obj)
	}
	return (
		<div>
			<h3>Wybierz posiłek</h3>
			<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FlexiMealSelectable control={control} name={'mealId'} dayPartMeals={dayPartMeals} />
				{/*TODO: block adding orders when the date is not today: disabled={!isToday(currentDateListing)}*/}
				<button type={'submit'}>Potwierdź wybór</button>
			</form>
			</FormProvider>
		</div>
	)
}