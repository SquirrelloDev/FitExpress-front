import {Tabs} from "@mantine/core";
import classes from "../../sass/pages/home.module.scss";
import {Order} from "../../types/dbtypes/Order";
import Card from "../../components/Card/Card";
import {Link} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import btnStyles from '../../sass/components/button.module.scss'
import clsx from "clsx";
interface StandardLayoutProps{
    orderData: Order[]
}
function StandardLayout({orderData}:StandardLayoutProps) {
    const intlDate = new Intl.DateTimeFormat("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(new Date())

    return (
        <>
            <h4>Dzisiaj {intlDate}</h4>
            <section>
                <Tabs defaultValue={orderData[0].name} classNames={{root: classes.standard__tabs, list: classes.standard__tabs__list, tab: classes.standard__tabs__tab, panel: classes.standard__tabs__pannel}}>
                    <Tabs.List grow>
                    {orderData.map(item => <Tabs.Tab value={item.name} key={item._id}>{item.name}</Tabs.Tab>)}
                    </Tabs.List>
                    {orderData.map(item => <Tabs.Panel key={item._id} value={item.name}>
                        Testowa dieta {item.name}
                        <Card>
                            <div className={classes.standard__progress}>
                                <p>Postępy diety</p>
                                <div className={classes.standard__progress__pill}><p>{new Date().toLocaleDateString()}</p></div>
                                <p>16/20 dni</p>
                                <div className={classes.standard__progress__bar}>
                                    <div className={classes.standard__progress__bar__fill}></div>
                                    <div className={classes.standard__progress__bar__dot}><span>75%</span></div>
                                </div>
                                <Link to={appRoutes.dietManagement} className={clsx(btnStyles.btn, btnStyles['btn--link'])}>Zarządzaj dietą</Link>
                            </div>
                        </Card>
                    </Tabs.Panel>)}
                </Tabs>
            </section>
            {/*	tabs*/}
        </>
    )
}

export default StandardLayout;