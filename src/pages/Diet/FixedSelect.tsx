import {appRoutes} from "../../utils/routes";
import classes from "../../sass/pages/diet-select.module.scss";
import {IconChevronLeft} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

function FixedSelect() {
	const navigate = useNavigate()
	return (
		<div className={classes['page-wrapper']}>
			<button onClick={() => navigate(-1)} className={classes['page-wrapper__back']}><IconChevronLeft color={'#fff'} size={30}/></button>
			<h1 className={classes['page-wrapper__header']}>Diety Fixed</h1>
			<p className={classes['page-wrapper__sub-header']}>Która dieta jest dla Ciebie?</p>
		</div>
	)
}
export default FixedSelect