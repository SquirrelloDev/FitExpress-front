import Card from "../Card/Card";
import {IconEdit} from "@tabler/icons-react";
import {HealthData} from "../../types/dbtypes/HealthData";
import useUserHealthParser from "../../hooks/useUserGoal";
import classes from "../../sass/components/user-health-card.module.scss";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";

interface UserHealthCardProps {
    healthData: HealthData
}

export default function UserHealthCard({healthData}: UserHealthCardProps) {
    const navigate = useNavigate()
    const {
        userGoal,
        userPalActive,
        userPalPassive
    } = useUserHealthParser(healthData.user_goal, healthData.pal_active, healthData.pal_passive)
    return (
        <Card clearPadding>
            <div className={classes['user-card']}>
                <div className={classes['user-card__header']}><h3>Moja karta zdrowia</h3>
                    <button onClick={() => navigate(appRoutes.editHcard)} className={classes['user-card__header__edit']}><IconEdit size={30}/></button>
                </div>
                <hr className={classes['user-card__divider']}/>
                <div className={classes['user-card__grid']}>
                    <div className={clsx(classes['user-card__grid__item'], classes['user-card__grid__item--gender'])}>
                        <Card>
                            <p>Płeć</p>
                            <p>{healthData.gender === 'M' ? 'Mężczyzna' : "Kobieta"}</p>
                        </Card>
                    </div>
                    <div className={classes['user-card__grid__item']}>
                        <Card>
                            <p>Startowa waga</p>
                            <p>{healthData.user_weight_current} kg</p>
                        </Card>
                    </div>
                    <div className={classes['user-card__grid__item']}>
                        <Card>
                            <p>Docelowa waga</p>
                            <p>{healthData.user_weight_planned} kg</p>
                        </Card>
                    </div>
                    <div className={classes['user-card__grid__item']}>
                        <Card>
                            <p>Wzrost</p>
                            <p>{healthData.user_height} cm</p>
                        </Card>
                    </div>
                    <div className={classes['user-card__grid__item']}>
                        <Card>
                            <p>Wiek</p>
                            <p>{healthData.age}</p>
                        </Card>
                    </div>
                    <div className={clsx(classes['user-card__grid__item'], classes['user-card__grid__item--pal-active'])}>
                        <Card>
                            <p>Aktywność treningowa</p>
                            <p>{userPalActive}</p>
                        </Card>
                    </div>
                    <div className={clsx(classes['user-card__grid__item'], classes['user-card__grid__item--pal-passive'])}>
                        <Card>
                            <p>Aktywność pozatreningowa</p>
                            <p>{userPalPassive}</p>
                        </Card>
                    </div>
                    <div className={clsx(classes['user-card__grid__item'], classes['user-card__grid__item--goal'])}>
                        <Card>
                            <p>Strategia</p>
                            <p>{userGoal}</p>
                        </Card>
                    </div>

                </div>
            </div>
        </Card>
    )
}