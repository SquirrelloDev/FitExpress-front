import classes from "../../sass/pages/diet-details.module.scss";
import btnStyles from '../../sass/components/button.module.scss';
import {IconChevronDown, IconChevronLeft, IconPhotoOff} from "@tabler/icons-react";
import {useNavigate, useParams} from "react-router-dom";
import clsx from "clsx";
import useAuthStore from "../../stores/authStore";
import {useOneDietListQuery} from "../../queries/diets/listing";
import Card from "../../components/Card/Card";
import MacroItems from "../../components/MacroItem/MacroItems";
import {useEffect} from "react";
import {Progress, RingProgress} from "@mantine/core";
import MealCount from "../../components/MealCount";

function DietDetails() {
    const navigate = useNavigate()
    const params = useParams();
    const userData = useAuthStore((state) => state.userData)
    const {data, isLoading} = useOneDietListQuery({id: params.diet!, token: userData.token})
    useEffect(() => {
        console.log(data?.diet.macros)
    }, [data])
    return (
        <div className={classes.details}>
            <button onClick={() => navigate(-1)} className={classes.details__back}><IconChevronLeft
                color={'#fff'} size={30}/></button>
            <div className={classes['details__image-box']}>
                {data?.diet.imageBuffer ? <img src={'data:;base64,' + data?.diet.imageBuffer} className={classes['details__image-box__image']} alt={`Obrazek diety: ${data?.diet.name}`}/> : <div className={clsx(classes['details__image-box__image'], classes['details__image-box__image--blank'])}><IconPhotoOff size={80} color={'#404040FF'}/></div>}
                <div className={classes['details__image-box__info']}>
                    <h1>{data?.diet.name}</h1>
                    <p>{data?.diet.short_desc}</p>
                    <IconChevronDown size={40} className={classes['details__image-box__info__chevron']}/>
                </div>
            </div>
            <div className={classes.details__info}>
                <h2>Szczegóły diety</h2>
                <button className={clsx(btnStyles.btn, btnStyles['btn--outline'], classes['details__info__menu-btn'])}>Zobacz menu</button>
                {data?.diet.diet_type === 'Flexi' && <MealCount mealCount={15} dietName={data.diet.name}/>}
                <h2>Podstawowe informacje</h2>
                <ul className={classes.details__info__basic}>
                    {data?.diet.basic_info.map(info => <li key={info}>{info}</li>)}
                </ul>
                {
                    data?.diet.macros.carbs && (
                        <div className={classes.details__info__macros}>
                            <h3>Makroskładniki</h3>
                            <MacroItems carbs={data.diet.macros.carbs} fats={data.diet.macros.fats} proteins={data.diet.macros.proteins}/>
                        </div>
                    )
                }
                {data?.diet.diet_type === 'Flexi' && (
                    <div className={classes.details__info__tags}>
                        <h3>Jakiego typu potrawy znajdziesz</h3>
                        <div className={classes.details__info__tags__grid}>
                            {data.diet.tags_id.map(tag => (
                                <Card>
                                    <h4>{tag.name}</h4>
                                    <p>{tag.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
                <div>
                    <h3>Wykluczenia</h3>
                    <ul className={classes.details__info__exclusions}>
                        {data?.diet.exclusions.map(excl => <li key={excl._id}>{excl.name}</li>)}
                    </ul>
                </div>
                <div className={classes.details__info__description}>
                    <h3>Szczegółowy opis diety</h3>
                    <p>{data?.diet.long_desc}</p>
                </div>
                <div>
                    <h3>Dostępne kaloryczności</h3>
                    {!isLoading && Object.keys(data?.diet.prices).map(price => (
                        <Card key={price}>
                            <div className={classes.details__info__prices}>
                                <p>{price}</p>
                                <p>{data?.diet.prices[price]} zł</p>
                            </div>
                        </Card>
                    ))}
                </div>
                <button className={btnStyles.btn}>Zamów dietę od {data?.diet.prices.kcal1500}zł/dzień</button>
            </div>
        </div>
    )
}

export default DietDetails