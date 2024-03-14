import btnStyles from '../../sass/components/button.module.scss'
import classes from "../../sass/pages/health-summary.module.scss";
import {IconArrowBigRightLineFilled} from "@tabler/icons-react";
import clsx from "clsx";
import useAuthStore from "../../stores/authStore";
import {useOneUserListQuery} from "../../queries/user/listing";
import useBMICategory from "../../hooks/useBMICategory";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import {TailSpin} from "react-loader-spinner";

function HealthCardSummary() {
    const userData = useAuthStore((state) => state.userData);
    const navigate = useNavigate();
    const {data, isLoading, isSuccess} = useOneUserListQuery({id: userData.id, token: userData.token});
    const {currentCategory, plannedCategory} = useBMICategory()
    if(isLoading) return (
        <TailSpin visible={true}/>
    )
    return (
        <div className={classes['summary-wrapper']}>
            <h1 className={classes['summary-wrapper__header']}>Twój plan</h1>
            <div className={classes['summary-wrapper__section']}>
                <div className={classes['summary-wrapper__section__item']}>
                    <h4>Cel</h4>
                    <div className={classes['summary-wrapper__section__item__weight__grid']}>
                        <div className={classes['summary-wrapper__section__item__weight__grid__item']}>
                            <p>{data?.user.health_data.user_weight_current} kg</p>
                            <p>Obecna waga</p>
                        </div>
                        <div>
                            <IconArrowBigRightLineFilled size={30} className={classes['summary-wrapper__section__item__weight__grid__item']}/>
                        </div>
                        <div className={classes['summary-wrapper__section__item__weight__grid__item']}>
                            <p>{data?.user.health_data.user_weight_planned} kg</p>
                            <p>Planowana waga</p>
                        </div>

                    </div>
                </div>
                <div className={classes.container}>
                <div className={clsx(classes['summary-wrapper__section__item'], classes['summary-wrapper__section__item__calories'])}>
                    <h4>Dzienne zapotrzebowanie</h4>
                    <p>{data?.user.health_data.calories_demand} kcal</p>
                    <p>Przy wyborze kaloryczności diety dostaniesz wskazówkę, która pozwoli osiągnąć cel</p>
                </div>
                <div className={clsx(classes['summary-wrapper__section__item'], classes['summary-wrapper__section__item__water'])}>
                    <h4>Dzienne spożycie płynów</h4>
                    <p>{data?.user.health_data.water_demand} ml</p>
                    <p>Nie zapominaj o spożywaniu płynów; najlepiej wody mineralnej do dostarczenia niezbędnych
                        makroskładników</p>
                </div>
                </div>
            </div>
            <div>
                <h3 className={classes['summary-wrapper__header']}>BMI</h3>
                <div className={classes.container}>
                <div className={clsx(classes['summary-wrapper__section__item'], classes['summary-wrapper__section__item__bmi'])}>
                    <h4>Aktualne BMI</h4>
                    {isSuccess && (
                    <div>
                        <p className={clsx(classes['summary-wrapper__section__item__bmi__text'], classes[`summary-wrapper__section__item__bmi__text--${currentCategory(data!.user.health_data.bmi).color}`])}>{data!.user.health_data.bmi}</p>
                        <p className={clsx(classes['summary-wrapper__section__item__bmi__text'], classes[`summary-wrapper__section__item__bmi__text--${currentCategory(data!.user.health_data.bmi).color}`])}>{currentCategory(data!.user.health_data.bmi).name}</p>
                    </div>
                    )}
                </div>
                <div className={clsx(classes['summary-wrapper__section__item'], classes['summary-wrapper__section__item__bmi'])}>
                    <h4>Spodziewane BMI</h4>
                    {isSuccess && (
                    <div>
                        <p className={clsx(classes['summary-wrapper__section__item__bmi__text'], classes[`summary-wrapper__section__item__bmi__text--${plannedCategory(data!.user.health_data.bmi_planned)?.color}`])}>{data!.user.health_data.bmi_planned}</p>
                        <p className={clsx(classes['summary-wrapper__section__item__bmi__text'], classes[`summary-wrapper__section__item__bmi__text--${plannedCategory(data!.user.health_data.bmi_planned)?.color}`])}>{plannedCategory(data!.user.health_data.bmi_planned)?.name}</p>
                    </div>
                    )}
                </div>
                </div>
            </div>
            <div className={classes['summary-wrapper__footer']}>
                <p>Swój cel możesz zawsze zmienić w zakładce: <span>Zdrowie</span></p>
                <button className={btnStyles.btn} onClick={() => navigate(appRoutes.home)}>Przejdź do aplikacji</button>
            </div>
        </div>
    )
}

export default HealthCardSummary