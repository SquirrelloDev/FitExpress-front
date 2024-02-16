import classes from "../../sass/pages/home.module.scss";
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