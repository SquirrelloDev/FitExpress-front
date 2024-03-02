import {Control, Controller, FieldValues, Path, useFormContext} from "react-hook-form";
import {Link} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import {Meal} from "../../types/dbtypes/Meal";

interface FlexiMealSelectableProps<T extends FieldValues> {
	control: Control<T>
	name: string
	dayPartMeals: Meal[],
}
function FlexiMealSelectable<T extends FieldValues>({control, name, dayPartMeals}: FlexiMealSelectableProps<T>) {
	const {formState: {errors}} = useFormContext()
	return (
		<Controller name={name as Path<T>} control={control} render={({field: {onChange}}) => (
			<>
				{dayPartMeals.map((meal,idx) => (
					<label htmlFor={meal._id} key={`${meal._id}-${idx}`}>
						<input type={'radio'} name={'mealSelection'} id={meal._id} onClick={() => onChange(meal._id)}/>
						<h4>{meal.name}</h4>
						<Link to={`${appRoutes.meal}/${meal._id}`}>Szczegóły</Link>
					</label>
				))}
			</>
		)}/>
	)
}
export default FlexiMealSelectable