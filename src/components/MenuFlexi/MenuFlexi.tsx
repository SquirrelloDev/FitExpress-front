import {DayFlexi} from "../../types/dbtypes/DayFlexi";
import useFlexiList from "../../hooks/useFlexiList";
import Card from "../Card/Card";
import {appRoutes} from "../../utils/routes";
import {Link} from "react-router-dom";
import BottomActionSheet from "../BottomActionSheet/BottomActionSheet";
import {useDisclosure} from "@mantine/hooks";
import FlexiSelection from "../FlexiSelection/FlexiSelection";
import {useState} from "react";
import {parseIntoMidnight} from "../../utils/dates";
import {isToday} from "date-fns";
import FlexiDetails from "../FlexiDetails/FlexiDetails";
import useFlexiTier from "../../hooks/useFlexiTier";

interface MenuFlexiProps {
	data: DayFlexi
	currentDateListing: Date
	orderId: string
	flexiTier: number | undefined
	dietId: string,
	token: string
}
const helperArr = ['morning_meals', 'lunch_meals', 'dinner_meals', 'teatime_meals', 'supper_meals']
function MenuFlexi({data, currentDateListing, orderId, dietId, token, flexiTier}:MenuFlexiProps) {
	const initialMeals = useFlexiList(currentDateListing,data, token, orderId)
	const [opened, {open, close}] = useDisclosure(false)
	const [selectedDayPart, setSelectedDayPart] = useState<string>(helperArr[0])
	const mealInfo = useFlexiTier(data[selectedDayPart]);
	return (
		<>
		<div>
			{initialMeals.map((meal, index) => (
				<Card clearPadding key={`${meal._id}-${index}`}>
					<div>
						<h4>{meal.name}</h4>
						<p>{meal.description}</p>
						<Link to={`${appRoutes.meal}/${meal._id}`}>Szczegóły</Link>
						<button onClick={() => {
							setSelectedDayPart(helperArr[index])
							open()
						}}>{isToday(currentDateListing) ? 'Zmień' : 'Sprawdź'}</button>
					</div>
				</Card>
			))}
		</div>
			<BottomActionSheet opened={opened} close={close} size={'100%'}>
				{isToday(currentDateListing) ? <FlexiSelection orderId={orderId} flexiTier={flexiTier} dietId={dietId} currentDateListing={currentDateListing} closeSheet={close} dayPartMeals={mealInfo} dayPartIdx={helperArr.indexOf(selectedDayPart)} selectedMeals={initialMeals.map(meal => meal._id)}/> : <FlexiDetails dayPartMeals={mealInfo} flexiTier={flexiTier} />}
			</BottomActionSheet>
		</>
	)
}
export default MenuFlexi
