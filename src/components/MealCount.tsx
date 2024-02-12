import {Progress} from "@mantine/core";
import classes from "../sass/pages/diet-details.module.scss";
import {getFlexiCount} from "../utils/dietsCalc";
import {percents} from "../utils/calcDays";
interface MealCountProps {
	dietName: string,
}
function MealCount({dietName}:MealCountProps) {
	const allMeals = 30;
	const selectedDietMealsCount = getFlexiCount(dietName)
	const percentage = percents(allMeals, selectedDietMealsCount);
	return (
		<div className={classes.details__progress}>
			<h3><span>{selectedDietMealsCount}</span> dań do wyboru</h3>
			<Progress value={percentage} size={'xl'} radius={'sm'} classNames={{root: classes.details__progress__root, section: classes.details__progress__section}}/>
		</div>
	)
}
export default MealCount