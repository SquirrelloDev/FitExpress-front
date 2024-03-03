import {Control, Controller, FieldValues, Path, useFormContext} from "react-hook-form";
import {Link} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import {Meal} from "../../types/dbtypes/Meal";
import classes from "../../sass/components/flexi-selection.module.scss";
import {useState} from "react";
import clsx from "clsx";

interface FlexiMealSelectableProps<T extends FieldValues> {
	control: Control<T>
	name: string
	flexiTier: number | undefined
	dayPartMeals: {meal: Meal, tier: number}[],
}
function FlexiMealSelectable<T extends FieldValues>({control, name, dayPartMeals, flexiTier}: FlexiMealSelectableProps<T>) {
	const {formState: {errors}} = useFormContext()
	const [selectedRadio, setSelectedRadio] = useState<number>(-1)
	return (
		<Controller name={name as Path<T>} control={control} render={({field: {onChange}}) => (
			<>
				{dayPartMeals.filter(mealInfo => mealInfo.tier <= flexiTier).map((meal,idx) => (
					<label htmlFor={`${meal.meal._id}-${idx}`} key={`${meal.meal._id}-${idx}`} className={clsx(classes.selection__selectable, selectedRadio === idx && classes['selection__selectable--active'])}>
						<input type={'radio'} name={'mealSelection'} id={`${meal.meal._id}-${idx}`} onClick={() =>{
							onChange(meal.meal._id)
							setSelectedRadio(idx)
						} }/>
						<h4>{meal.meal.name}</h4>
						<p>{meal.meal.description}</p>
						<Link to={`${appRoutes.meal}/${meal.meal._id}`}>Szczegóły</Link>
					</label>
				))}
			</>
		)}/>
	)
}
export default FlexiMealSelectable