import Card from "../../components/Card/Card";
import btnStyles from '../../sass/components/button.module.scss'
import classes from "../../sass/pages/home.module.scss";
import {Link} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import clsx from "clsx";
function NoOrders() {
    const intlDate = new Intl.DateTimeFormat("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(new Date())
    return (
        <>
            <h3 className={classes['no-orders__main-header']}>Brak aktywnych diet 😥</h3>
            <h4>Dzisiaj {intlDate}</h4>
            <section className={classes['no-orders__section']}>
                <Card>
                    <div className={classes['no-orders__cta-box']}>
                    <p>Czas na kolejny krok</p>
                    <Link to={appRoutes.diets} className={clsx(btnStyles.btn, btnStyles['btn--link'])}>Wybierz dietę</Link>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default NoOrders;