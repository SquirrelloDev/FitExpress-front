import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useFlexiByDayQuery} from "../../queries/flexi/listing";
import useAuthStore from "../../stores/authStore";
import {useEffect, useState} from "react";
import {DayParams, useFixedByDayQuery} from "../../queries/fixed/listing";
import {appRoutes} from "../../utils/routes";
import {IconArrowLeft, IconArrowRight} from "@tabler/icons-react";
import Card from "../../components/Card/Card";
import {Tabs} from "@mantine/core";
import classes from "../../sass/pages/diet-menu.module.scss";
import btnStyles from '../../sass/components/button.module.scss'
import clsx from "clsx";
import {parseIntoMidnight} from "../../utils/dates";
import BackButton from "../../components/BackBtn/BackButton";
import {addDays} from "date-fns";

const daytimes = ['Śniadanie', 'Lunch', 'Obiad', 'Podwieczorek', 'Kolacja'];
function DietMenu() {
    const navigate = useNavigate()
    const params = useParams()
    const [searchParams] = useSearchParams()
    const userData = useAuthStore((state) => state.userData);
    const [page, setPage] = useState<number>(0)
    const [dayData, setDayData] = useState<DayParams>({token: userData.token, date: parseIntoMidnight(new Date())})
    const {
        data: flexiData,
        isLoading: isFlexiLoading,
        refetch: refetchFlexi
    } = useFlexiByDayQuery(dayData)
    const {
        data: fixedData,
        isLoading: isFixedLoading,
        refetch: refetchFixed
    } = useFixedByDayQuery(dayData)
    useEffect(() => {
        if(searchParams.get('type') !== 'Fixed' && searchParams.get('type') !== 'Flexi'){
            navigate(appRoutes.notAuthorized);
        }
        if (searchParams.get('type') === 'Fixed') {
            refetchFixed()
        }
        if (searchParams.get('type') === 'Flexi') {
            refetchFlexi()
        }
    }, [navigate, refetchFixed, refetchFlexi, searchParams])
    const nextDay = () => {
        setPage(prevState => prevState + 1);
        setDayData(prevState => {
           return {token: userData.token, date: new Date(addDays(prevState.date, 1).setHours(1, 0, 0, 0))}
        })
    }
    const previousDay = () => {
        setPage(prevState => prevState - 1);
        setDayData(prevState => {
            return {token: userData.token, date: new Date(addDays(prevState.date, -1).setHours(1, 0, 0, 0))}
        })
    }
    useEffect(() => {
        if (searchParams.get('type') === 'Fixed') {
            refetchFixed()
        }
        if (searchParams.get('type') === 'Flexi') {
            refetchFlexi()
        }
    }, [dayData, refetchFixed, refetchFlexi, searchParams])
    const displayDate = () =>{
        if(searchParams.get('type') === 'Fixed' && !isFixedLoading){
            return new Date(fixedData!.day.date).toLocaleDateString()
        }
        else if(searchParams.get('type') === 'Flexi' && !isFlexiLoading){
            return new Date(flexiData!.day.date).toLocaleDateString()
        }
        else{
            return 'Wczytywanie...'
        }
    }
    return (
        <div className={classes.menu}>
            <BackButton />
            <h2>Podgląd menu</h2>
            <div className={classes.menu__controls}>
                <button disabled={page === 0} onClick={previousDay} className={clsx(btnStyles.btn, btnStyles['btn--dark'], classes.menu__controls__btns)}><IconArrowLeft/></button>
                <h3>{displayDate()}</h3>
                <button disabled={page === 6} onClick={nextDay} className={clsx(btnStyles.btn, btnStyles['btn--dark'], classes.menu__controls__btns)}><IconArrowRight/></button>
            </div>
            {(!isFixedLoading && searchParams.get('type') === 'Fixed') && (
                <div>
                    {Object.values(fixedData!.day.diets.find(diet => diet.diet_id._id === params.diet)!.meals).map((meal, idx) => (
                        <Card key={meal._id}>
                            <div className={classes.menu__meal}>
                                <h3>{daytimes[idx]}</h3>
                                <p>{meal.name}</p>
                                <button className={clsx(btnStyles.btn, classes.menu__meal__details)} onClick={() => navigate(appRoutes.meal + `/${meal._id}`)}>Szczegóły</button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
            {(!isFlexiLoading && searchParams.get('type') === 'Flexi') && (
                <div>
                    <Tabs defaultValue={'morning'} classNames={{list: classes.menu__tabs__list, tab: classes.menu__tabs__tab}}>
                    <Tabs.List grow>
                        <Tabs.Tab value={'morning'}>Śniadanie</Tabs.Tab>
                        <Tabs.Tab value={'lunch'}>Lunch</Tabs.Tab>
                        <Tabs.Tab value={'dinner'}>Obiad</Tabs.Tab>
                        <Tabs.Tab value={'teatime'}>Podwieczorek</Tabs.Tab>
                        <Tabs.Tab value={'supper'}>Kolacja</Tabs.Tab>
                    </Tabs.List>
                        <Tabs.Panel value={'morning'}>{flexiData?.day.morning_meals.map((meal, idx) => (
                            <Card key={meal._id + idx}>
                                <div className={classes.menu__meal}>
                                    <div className={classes.menu__meal__details__subsciption}>
                                        <h3>{`Posiłek ${idx + 1}`}</h3>
                                        {idx > 2 && <div className={classes.menu__meal__details__subsciption__pill}><p>{idx < 4 ? 'Tylko w Plus' : 'Tylko w All-in'}</p></div>}
                                    </div>
                                    <p>{meal.name}</p>
                                    <button className={clsx(btnStyles.btn, classes.menu__meal__details)} onClick={() => navigate(appRoutes.meal + `/${meal._id}`)}>Szczegóły</button>
                                </div>
                            </Card>
                        ))}</Tabs.Panel>
                        <Tabs.Panel value={'lunch'}>{flexiData?.day.lunch_meals.map((meal, idx) => (
                            <Card key={meal._id + idx}>
                                <div className={classes.menu__meal}>
                                    <div className={classes.menu__meal__details__subsciption}>
                                        <h3>{`Posiłek ${idx + 1}`}</h3>
                                        {idx > 2 && <div className={classes.menu__meal__details__subsciption__pill}><p>{idx < 4 ? 'Tylko w Plus' : 'Tylko w All-in'}</p></div>}
                                    </div>
                                    <p>{meal.name}</p>
                                    <button className={clsx(btnStyles.btn, classes.menu__meal__details)} onClick={() => navigate(appRoutes.meal + `/${meal._id}`)}>Szczegóły</button>
                                </div>
                            </Card>
                        ))}</Tabs.Panel>
                        <Tabs.Panel value={'dinner'}>{flexiData?.day.dinner_meals.map((meal, idx) => (
                            <Card key={meal._id + idx}>
                                <div className={classes.menu__meal}>
                                    <div className={classes.menu__meal__details__subsciption}>
                                        <h3>{`Posiłek ${idx + 1}`}</h3>
                                        {idx > 2 && <div className={classes.menu__meal__details__subsciption__pill}><p>{idx < 4 ? 'Tylko w Plus' : 'Tylko w All-in'}</p></div>}
                                    </div>
                                    <p>{meal.name}</p>
                                    <button className={clsx(btnStyles.btn, classes.menu__meal__details)} onClick={() => navigate(appRoutes.meal + `/${meal._id}`)}>Szczegóły</button>
                                </div>
                            </Card>
                        ))}</Tabs.Panel>
                        <Tabs.Panel value={'teatime'}>{flexiData?.day.teatime_meals.map((meal, idx) => (
                            <Card key={meal._id + idx}>
                                <div className={classes.menu__meal}>
                                    <div className={classes.menu__meal__details__subsciption}>
                                        <h3>{`Posiłek ${idx + 1}`}</h3>
                                        {idx > 2 && <div className={classes.menu__meal__details__subsciption__pill}><p>{idx < 4 ? 'Tylko w Plus' : 'Tylko w All-in'}</p></div>}
                                    </div>
                                    <p>{meal.name}</p>
                                    <button className={clsx(btnStyles.btn, classes.menu__meal__details)} onClick={() => navigate(appRoutes.meal + `/${meal._id}`)}>Szczegóły</button>
                                </div>
                            </Card>
                        ))}</Tabs.Panel>
                        <Tabs.Panel value={'supper'}>{flexiData?.day.supper_meals.map((meal, idx) => (
                            <Card key={meal._id + idx}>
                                <div className={classes.menu__meal}>
                                    <div className={classes.menu__meal__details__subsciption}>
                                    <h3>{`Posiłek ${idx + 1}`}</h3>
                                        {idx > 2 && <div className={classes.menu__meal__details__subsciption__pill}><p>{idx < 4 ? 'Tylko w Plus' : 'Tylko w All-in'}</p></div>}
                                    </div>
                                    <p>{meal.name}</p>
                                    <button className={clsx(btnStyles.btn, classes.menu__meal__details)} onClick={() => navigate(appRoutes.meal + `/${meal._id}`)}>Szczegóły</button>
                                </div>
                            </Card>
                        ))}</Tabs.Panel>
                    </Tabs>
                </div>
            )}
        </div>
    )
}
export default DietMenu