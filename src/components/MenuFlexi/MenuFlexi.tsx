import {DayFlexi} from "../../types/dbtypes/DayFlexi";
import useFlexiList from "../../hooks/useFlexiList";
import Card from "../Card/Card";
import {appRoutes} from "../../utils/routes";
import {Link} from "react-router-dom";
import BottomActionSheet from "../BottomActionSheet/BottomActionSheet";
import {useDisclosure} from "@mantine/hooks";
import FlexiSelection from "../FlexiSelection/FlexiSelection";
import {useState} from "react";
import {isToday} from "date-fns";
import FlexiDetails from "../FlexiDetails/FlexiDetails";
import useFlexiTier from "../../hooks/useFlexiTier";
import classes from "../../sass/pages/menu-page.module.scss";
import {Meal} from "../../types/dbtypes/Meal";

interface MenuFlexiProps {
	data: DayFlexi
	currentDateListing: Date
	orderId: string
	flexiTier: number
	dietId: string,
	token: string
}
const helperArr = ['morning_meals', 'lunch_meals', 'dinner_meals', 'teatime_meals', 'supper_meals']
function MenuFlexi({data, currentDateListing, orderId, dietId, token, flexiTier}:MenuFlexiProps) {
	const initialMeals = useFlexiList(currentDateListing,data, token, orderId)
	const [opened, {open, close}] = useDisclosure(false)
	const [selectedDayPart, setSelectedDayPart] = useState<string>(helperArr[0])
	const mealInfo = useFlexiTier(data[selectedDayPart as keyof {morning_meals: Meal, lunch_meals: Meal, dinner_meals: Meal, teatime_meals: Meal, supper_meals: Meal}]);
	return (
		<>
		<div>
			{initialMeals.map((meal, index) => (
				<Card clearPadding key={`${meal._id}-${index}`}>
					<div className={classes.menu__item}>
						<h4>{meal.name}</h4>
						<p className={classes.menu__item__desc}>{meal.description}</p>
						<div className={classes.menu__item__actions}>
						<Link to={`${appRoutes.meal}/${meal._id}`}>Szczegóły</Link>
						<button className={classes.menu__item__actions__check} onClick={() => {
							setSelectedDayPart(helperArr[index])
							open()
						}}>{!isToday(currentDateListing) ? 'Zmień' : 'Sprawdź'}</button>
						</div>
					</div>
				</Card>
			))}
		</div>
			<BottomActionSheet opened={opened} close={close} size={'100%'}>
				{!isToday(currentDateListing) ? <FlexiSelection orderId={orderId} flexiTier={flexiTier} dietId={dietId} currentDateListing={currentDateListing} closeSheet={close} dayPartMeals={mealInfo} dayPartIdx={helperArr.indexOf(selectedDayPart)} selectedMeals={initialMeals.map(meal => meal._id)}/> : <FlexiDetails dayPartMeals={mealInfo} flexiTier={flexiTier} />}
			</BottomActionSheet>
		</>
	)
}
export default MenuFlexi
