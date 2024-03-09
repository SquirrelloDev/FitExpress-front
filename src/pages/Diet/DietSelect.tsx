import {IconChevronLeft} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import Card from "../../components/Card/Card";
import {appRoutes} from "../../utils/routes";
import classes from "../../sass/pages/diet-select.module.scss";
import BackButton from "../../components/BackBtn/BackButton";
function DietSelect() {
	const navigate = useNavigate()
	return (
		<div className={classes['page-wrapper']}>
			<BackButton/>
			<h1 className={classes['page-wrapper__header']}>Która dieta spełnia Twoje oczekiwania?</h1>
			<Card>
				<div onClick={() => navigate(appRoutes.fixedDiets)} className={classes['page-wrapper__box']}>
					<h2>Fixed</h2>
					<p>Dieta typu Fixed zawiera jadłospisy przygotowane przez naszych specjalistów.
						Każda dieta uwzględnia twoje potrzeby</p>
				</div>
			</Card>
			<Card>
				<div onClick={() => navigate(appRoutes.flexiDiets)} className={classes['page-wrapper__box']}>
					<h2>Flexi</h2>
					<p>Dieta typu flexi jest przeznaczona dla osób, które chcą stworzyć swoją idealną dietę.</p>
				</div>
			</Card>
		</div>
	)
}
export default DietSelect