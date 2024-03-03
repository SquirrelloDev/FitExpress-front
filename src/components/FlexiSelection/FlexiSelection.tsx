import {Meal} from "../../types/dbtypes/Meal";
import {FormProvider, useForm} from "react-hook-form";
import {parseIntoMidnight} from "../../utils/dates";
import useAuthStore from "../../stores/authStore";
import useDailyCreate, {DailyPutData, dailySchema, DailySchema} from "../../queries/daily-orders/create";
import FlexiMealSelectable from "../FlexiMealSelectable/FlexiMealSelectable";
import {zodResolver} from "@hookform/resolvers/zod";
import {isToday} from "date-fns";
import {queryClient} from "../../utils/api";
import {TailSpin} from "react-loader-spinner";
import classes from "../../sass/components/flexi-selection.module.scss";
import btnStyles from '../../sass/components/button.module.scss'

interface FlexiSelectionProps {
	dayPartMeals: {meal: Meal, tier: number}[]
	dayPartIdx: number
	orderId: string
	dietId: string
	flexiTier?: number
	currentDateListing: Date,
	selectedMeals: string[]
	closeSheet: () => void
}
export default function FlexiSelection({dayPartMeals, dayPartIdx, dietId, orderId, flexiTier, currentDateListing, selectedMeals, closeSheet}:FlexiSelectionProps) {
	const userData = useAuthStore(state => state.userData)
	const {mutate, isLoading} = useDailyCreate(() => {
		queryClient.invalidateQueries(['DailyOrderList'])
		closeSheet()
	})
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
			<form onSubmit={handleSubmit(onSubmit)} className={classes.selection}>
				<FlexiMealSelectable control={control} name={'mealId'} dayPartMeals={dayPartMeals} flexiTier={flexiTier} />
				{isToday(currentDateListing) && <button disabled={isLoading} className={btnStyles.btn} type={'submit'}>{isLoading ? <TailSpin/> : 'Potwierdź wybór'}</button>}
			</form>
			</FormProvider>
		</div>
	)
}