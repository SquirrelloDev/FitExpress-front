import {Tabs} from "@mantine/core";
import classes from "../../sass/pages/home.module.scss";
import {Order} from "../../types/dbtypes/Order";
import Card from "../../components/Card/Card";
import {Link} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import btnStyles from '../../sass/components/button.module.scss'
import clsx from "clsx";
import {calcDaysBetween, percents} from "../../utils/calcDays";
import {IconCheck} from "@tabler/icons-react";
import HomeCalendar from "../../components/HomeCalendar/HomeCalendar";

interface StandardLayoutProps {
    orderData: Order[]
}

function StandardLayout({orderData}: StandardLayoutProps) {
    const currentDate = new Date();
    const intlDate = new Intl.DateTimeFormat("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(currentDate)
    return (
        <>
            <h4>Dzisiaj {intlDate}</h4>
            <section>
                <Tabs defaultValue={orderData[0].name} classNames={{
                    root: classes.standard__tabs,
                    list: classes.standard__tabs__list,
                    tab: classes.standard__tabs__tab,
                    panel: classes.standard__tabs__pannel
                }}>
                    <Tabs.List grow>
                        {orderData.map(item => <Tabs.Tab value={item.name} key={item._id}>{item.name}</Tabs.Tab>)}
                    </Tabs.List>
                    {orderData.map(item => {
                        const orderMaxDays = calcDaysBetween(new Date(item.sub_date.from), new Date(item.sub_date.to))
                        const currentOrderDay = calcDaysBetween(new Date(item.sub_date.from), new Date())
                        const percentValue = percents(orderMaxDays, currentOrderDay)
                        return (
                            <Tabs.Panel key={item._id} value={item.name}>
                               <HomeCalendar item={item} currentDate={currentDate} />
                                <Card>
                                    <div className={classes.standard__progress}>
                                        <p>Postępy diety</p>
                                        <div className={classes.standard__progress__pill}>
                                            <p>{currentDate.toLocaleDateString()}</p></div>
                                        <p>{currentOrderDay >= orderMaxDays ? 'Ukończono!' : `${currentOrderDay}/${orderMaxDays} dni`} </p>
                                        <div className={classes.standard__progress__bar}>
                                            <div className={classes.standard__progress__bar__fill}
                                                 style={{width: percentValue >= 100 ? '100%' : `${percentValue}%`}}></div>
                                            <div className={classes.standard__progress__bar__dot}
                                                 style={{left: percentValue >= 100 ? '98%' : `${percentValue}%`}}>
                                                <p>{percentValue >= 100 ? <IconCheck/> : `${percentValue}%`}</p></div>
                                        </div>
                                        <Link to={appRoutes.dietManagement}
                                              className={clsx(btnStyles.btn, btnStyles['btn--link'])}>Zarządzaj
                                            dietą</Link>
                                    </div>
                                </Card>
                            </Tabs.Panel>)
                    })}
                </Tabs>
            </section>
            {/*	tabs*/}
        </>
    )
}

export default StandardLayout;