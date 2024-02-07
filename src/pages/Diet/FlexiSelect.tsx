import classes from "../../sass/pages/diet-select.module.scss";
import {useNavigate} from "react-router-dom";
import {IconChevronLeft} from "@tabler/icons-react";

function FlexiSelect() {
	const navigate = useNavigate();
	return (
		<div className={classes['page-wrapper']}>
			<button onClick={() => navigate(-1)} className={classes['page-wrapper__back']}><IconChevronLeft color={'#fff'} size={30}/></button>
			<h1 className={classes['page-wrapper__header']}>Diety Flexi</h1>
			<p className={classes['page-wrapper__sub-header']}>Który plan jest dla Ciebie?</p>
		</div>
	)
}
export default FlexiSelect