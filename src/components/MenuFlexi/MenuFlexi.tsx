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

interface MenuFlexiProps {
	data: DayFlexi
	currentDateListing: Date
	orderId: string
	dietId: string,
	token: string
}
const helperArr = ['morning_meals', 'lunch_meals', 'dinner_meals', 'teatime_meals', 'supper_meals']
function MenuFlexi({data, currentDateListing, orderId, dietId, token}:MenuFlexiProps) {
	const initialMeals = useFlexiList(currentDateListing,data, token, orderId)
	const [opened, {open, close}] = useDisclosure(false)
	const [selectedDayPart, setSelectedDayPart] = useState<string>('')
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
						}}>Zmień</button>
					</div>
				</Card>
			))}
		</div>
			<BottomActionSheet opened={opened} close={close} size={'100%'}>
				<FlexiSelection orderId={orderId} dietId={dietId} currentDateListing={currentDateListing} dayPartMeals={data[selectedDayPart]} dayPartIdx={helperArr.indexOf(selectedDayPart)} selectedMeals={initialMeals.map(meal => meal._id)}/>
			</BottomActionSheet>
		</>
	)
}
export default MenuFlexi
