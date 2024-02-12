import {useNavigate, useParams} from "react-router-dom";
import useAuthStore from "../stores/authStore";
import {useOneMealListQuery} from "../queries/meal/listing";
import classes from "../sass/pages/meal.module.scss";
import {IconChevronLeft, IconPhotoOff} from "@tabler/icons-react";
import clsx from "clsx";
import Card from "../components/Card/Card";
import Nutrition from "../components/Nutrition/Nutrition";

function MealPage() {
	const navigate = useNavigate()
	const params = useParams();
	const userData = useAuthStore((state) => state.userData)
	const {data, isLoading} = useOneMealListQuery({id: params.id!, token: userData.token})
	return (
		<div className={classes.meal}>
			<button onClick={() => navigate(-1)} className={classes.meal__back}><IconChevronLeft
				color={'#fff'} size={30}/></button>
			<div className={classes['meal__image-box']}>
				{data?.meal.imageBuffer ? <img src={'data:;base64,' + data?.meal.imageBuffer} className={classes['meal__image-box__image']} alt={`Obrazek posiłku: ${data?.meal.name}`}/> : <div className={clsx(classes['meal__image-box__image'], classes['meal__image-box__image--blank'])}><IconPhotoOff size={80} color={'#404040FF'}/></div>}
			</div>
			<div className={classes.meal__info}>
				<h1>{data?.meal.name}</h1>
				<div className={classes.meal__info__description}>
				<h3>Opis posiłku</h3>
				<p>{data?.meal.description}</p>
				</div>
				<div className={classes.meal__info__tags}>
				<h3>Typy posiłku</h3>
				<div className={classes.meal__info__tags__grid}>
					{data?.meal.tags_id.map(tag => (
						<Card key={tag._id}>
							<div>
								<h4>{tag.name}</h4>
								<p>{tag.description}</p>
							</div>
						</Card>
					))}
				</div>
				</div>
				<div className={classes.meal__info__ingredients}>
				<h3>Składniki</h3>
				<p>{data?.meal.ingredients.join(', ')}</p>
				</div>
				<div className={classes.meal__info__nutritions}>
				<h3>Wartości odżywcze</h3>
					<div className={classes.meal__info__nutritions__wrapper}>
						<Nutrition value={data?.meal.nutrition_values.calories} name={'Kalorie'} unit={'kcal'}/>
						<Nutrition value={data?.meal.nutrition_values.carbs} name={'Węgl.'} unit={'g.'}/>
						<Nutrition value={data?.meal.nutrition_values.fats} name={'Tłusz.'} unit={'g.'}/>
						<Nutrition value={data?.meal.nutrition_values.proteins} name={'Białka'} unit={'g.'}/>
						<Nutrition value={data?.meal.nutrition_values.salt} name={'Sól'} unit={'g.'}/>
					</div>
				</div>
				<div className={classes.meal__info__exclusions}>
				<h3>Wykluczenia</h3>
				<ul className={classes.meal__info__exclusions__list}>
					{data?.meal.exclusions.map(excl => <li key={excl._id}>{excl.name}</li>)}
				</ul>
				</div>
			</div>
		</div>
	)
}
export default MealPage