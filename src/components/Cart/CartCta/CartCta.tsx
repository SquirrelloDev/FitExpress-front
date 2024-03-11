import classes from "../../../sass/pages/home.module.scss";
import Card from "../../Card/Card";
import {Link} from "react-router-dom";
import {appRoutes} from "../../../utils/routes";
import clsx from "clsx";
import btnStyles from "../../../sass/components/button.module.scss";
import useCartStore from "../../../stores/cartStore";

interface CartCtaProps {
	isReminder?: boolean
}
function CartCta({isReminder = false}:CartCtaProps) {
	const cartItems = useCartStore(state => state.cartItems)
	return (
			<section className={classes['no-orders__section']}>
				<Card>
					<div className={classes['no-orders__cta-box']}>
						{!isReminder ? <p className={classes['no-orders__cta-box__text']}>{cartItems.length > 0 ? 'Chcesz dobrać kolejną dietę?' : 'Czas na następny krok'}</p> : <p className={clsx(classes['no-orders__cta-box__text'], isReminder && classes['no-orders__cta-box__text--reminder'])}>W Twoim koszyku czekają diety!</p>}
						{isReminder && <p className={clsx(classes['no-orders__cta-box__text'], classes['no-orders__cta-box__text--reminder'])}>Liczba diet w koszyku: {cartItems.length}</p>}
						<Link to={!isReminder ? appRoutes.diets : appRoutes.cart} className={clsx(btnStyles.btn, btnStyles['btn--link'])}>{!isReminder ? 'Wybierz dietę' : 'Przejdź do koszyka'}</Link>
					</div>
				</Card>
			</section>
	)
}
export default CartCta