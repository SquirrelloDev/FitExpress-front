import Card from "../../components/Card/Card";
import btnStyles from '../../sass/components/button.module.scss'
import classes from "../../sass/pages/home.module.scss";
import {Link} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import clsx from "clsx";
import CartCta from "../../components/Cart/CartCta/CartCta";
import useCartStore from "../../stores/cartStore";

function NoOrders() {
    const intlDate = new Intl.DateTimeFormat("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(new Date())
    const cartItems = useCartStore(state => state.cartItems)
    return (
        <>
            <h3 className={classes['no-orders__main-header']}>Brak aktywnych diet 😥</h3>
            <h4>Dzisiaj {intlDate}</h4>
            {cartItems.length > 0 && <CartCta isReminder/>}
            <CartCta/>
        </>
    )
}

export default NoOrders;