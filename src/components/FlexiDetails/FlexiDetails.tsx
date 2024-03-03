import {Meal} from "../../types/dbtypes/Meal";
import Card from "../Card/Card";
import {appRoutes} from "../../utils/routes";
import {Link} from "react-router-dom";
import {getFlexiTierName} from "../../utils/dietsCalc";
import classes from "../../sass/components/flexi-details.module.scss";

interface FlexiDetailsProps {
	dayPartMeals: {meal: Meal, tier: number}[]
	flexiTier: number | undefined
}
function FlexiDetails({dayPartMeals}:FlexiDetailsProps) {
	return (
		<div>
			<h3>Sprawdź posiłki</h3>
			<div>
				{dayPartMeals.map(meal => (
					<Card>
						<div className={classes.details}>
							<div className={classes.details__header}>
							<h4>{meal.meal.name}</h4>
							<p>{`${getFlexiTierName(meal.tier)}`}</p>
							</div>
							<p className={classes.details__desc}>{meal.meal.description}</p>
							<Link to={`${appRoutes.meal}/${meal.meal._id}`}>Szczegóły</Link>
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}
export default FlexiDetails