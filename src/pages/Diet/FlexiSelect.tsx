import classes from "../../sass/pages/diet-select.module.scss";
import {useNavigate} from "react-router-dom";
import Card from "../../components/Card/Card";
import {appRoutes} from "../../utils/routes";
import useDietsListQuery from "../../queries/diets/listing";
import useAuthStore from "../../stores/authStore";
import {ReactNode} from "react";
import BackButton from "../../components/BackBtn/BackButton";
import {Grid} from "react-loader-spinner";

const textArr: ReactNode[] = [
	<p>Podstawowy pakiet <span className={classes['page-wrapper__diet__highlight']}>15 dań</span> do wyboru: od klasycznych po nieco bardziej egzotyczne smaki</p>,
	<p>Ten pakiet zawiera <span className={classes['page-wrapper__diet__highlight']}>20 dań</span> do wyboru. Zawiera dania uwielbiane przez naszych klientów</p>,
	<p>Największy pakiet <span className={classes['page-wrapper__diet__highlight']}>30 dań</span> do wyboru na miarę restauracji! Spróbuj wszystkich dań z oferty</p>
]
function FlexiSelect() {
	const navigate = useNavigate();
	const userData = useAuthStore((state) => state.userData)
	const {data, isLoading} = useDietsListQuery({token: userData.token, pageIndex: 0, pageSize: 0, dietType: 'Flexi'})
	return (
		<div className={classes['page-wrapper']}>
			<BackButton />
			<h1 className={classes['page-wrapper__header']}>Diety Flexi</h1>
			<p className={classes['page-wrapper__sub-header']}>Który plan jest dla Ciebie?</p>
			{isLoading && <Grid />}
			<div className={classes['page-wrapper__boxes']}>
			{!isLoading && data?.diets.map((diet, idx) => (<Card hover key={diet._id}>
				<div onClick={() => navigate(appRoutes.diets + `/${diet._id}`)}>
					<h2>{diet.name}</h2>
					{textArr[idx]}
				</div>
			</Card>))}
			</div>
		</div>
	)
}
export default FlexiSelect