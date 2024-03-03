import {DayFixed} from "../../types/dbtypes/DayFixed";
import {DayFlexi} from "../../types/dbtypes/DayFlexi";
import Card from "../Card/Card";
import {Link} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import classes from "../../sass/pages/menu-page.module.scss";

interface MenuFixedProps{
	data: DayFixed,
	dietId: string

}
function MenuFixed({data, dietId}:MenuFixedProps) {
	return (
		<div>
			{Object.values(data.diets.find(diet => diet.diet_id._id === dietId)!.meals).map(meal => (
				<Card clearPadding key={meal._id}>
					<div className={classes.menu__item}>
						<div>
							<div>
								<h4>{meal.name}</h4>
								<p className={classes.menu__item__desc}>{meal.description}</p>
								<Link to={`${appRoutes.meal}/${meal._id}`}>Szczegóły</Link>
							</div>
						</div>
					</div>
				</Card>
			))}
		</div>
	)
}
export default MenuFixed