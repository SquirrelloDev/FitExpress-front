import classes from "../../sass/pages/home.module.scss";
import CartCta from "../../components/Cart/CartCta/CartCta";
import useCartStore from "../../stores/cartStore";
// import PwaCta from "../../components/PWA-Componets/PWACta/PwaCta";
// import usePwaStore from "../../stores/pwaStore";
// import {useMediaQuery} from "@mantine/hooks";

function NoOrders() {
    // const appInstalled = usePwaStore(state => state.appInstalled)
    // const matches = useMediaQuery('(display-mode: standalone)');
    const cartItems = useCartStore(state => state.cartItems)
    return (
        <div className={classes['no-orders__wrapper']}>
            <h3 className={classes['no-orders__main-header']}>Brak aktywnych diet 😥</h3>
            <div className={classes['no-orders__wrapper__grid']}>
            {/*{(!matches) && <PwaCta/>}*/}
            {cartItems.length > 0 && <CartCta isReminder/>}
            <CartCta/>
            </div>

        </div>
    )
}

export default NoOrders;