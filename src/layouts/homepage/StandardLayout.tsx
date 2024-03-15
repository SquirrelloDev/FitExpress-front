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
import useCartStore from "../../stores/cartStore";
import CartCta from "../../components/Cart/CartCta/CartCta";
import PwaCta from "../../components/PWA-Componets/PWACta/PwaCta";
import {useMediaQuery} from "@mantine/hooks";
import usePwaStore from "../../stores/pwaStore";

interface StandardLayoutProps {
    orderData: Order[]
}

function StandardLayout({orderData}: StandardLayoutProps) {
    const appInstalled = usePwaStore(state => state.appInstalled)
    const matches = useMediaQuery('(display-mode: standalone)');
    const currentDate = new Date();
    const cartItems = useCartStore(state => state.cartItems)
    return (
        <>
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
                                <div className={classes.standard__wrapper}>
                                    {item.is_active && <HomeCalendar item={item} currentDate={currentDate}/> }
                                    <div className={classes.standard__wrapper__grid}>
                                    <Card>
                                        <div className={classes.standard__progress}>
                                            <p>Postępy diety</p>
                                            <div className={classes.standard__progress__pill}>
                                                <p>{currentDate.toLocaleDateString()}</p></div>
                                            <p>{currentOrderDay > 0 ? (currentOrderDay >= orderMaxDays ? 'Ukończono!' : `${currentOrderDay}/${orderMaxDays} dni`) : 'Plan się jeszcze nie zaczął'} </p>
                                            <div className={classes.standard__progress__bar}>
                                                <div className={classes.standard__progress__bar__fill}
                                                     style={{width: percentValue > 0 ? (percentValue >= 100 ? '100%' : `${percentValue}%`) : '0%'}}></div>
                                                <div className={classes.standard__progress__bar__dot}
                                                     style={{left: percentValue >= 100 ? '98%' : `${percentValue}%`}}>
                                                    <p>{percentValue >= 100 ? <IconCheck/> : `${percentValue}%`}</p>
                                                </div>
                                            </div>
                                            <Link to={appRoutes.dietManagement}
                                                  className={clsx(btnStyles.btn, btnStyles['btn--link'])}>Zarządzaj
                                                dietą</Link>
                                        </div>
                                    </Card>
                                    {cartItems.length > 0 && <CartCta isReminder/>}
                                    <CartCta/>
                                    {(!matches || !appInstalled) && <PwaCta/>}
                                    </div>
                                </div>
                            </Tabs.Panel>)
                    })}
                </Tabs>
            </section>
        </>
    )
}

export default StandardLayout;