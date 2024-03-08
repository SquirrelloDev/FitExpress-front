import classes from "../../sass/pages/home.module.scss";
import CartCta from "../../components/Cart/CartCta/CartCta";
import useCartStore from "../../stores/cartStore";
import PwaCta from "../../components/PWA-Componets/PWACta/PwaCta";
import usePwaStore from "../../stores/pwaStore";
import {useMediaQuery} from "@mantine/hooks";

function NoOrders() {
    const appInstalled = usePwaStore(state => state.appInstalled)
    const matches = useMediaQuery('(display-mode: standalone)');
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
            {!appInstalled || !matches && <PwaCta/>}
            {cartItems.length > 0 && <CartCta isReminder/>}
            <CartCta/>
        </>
    )
}

export default NoOrders;