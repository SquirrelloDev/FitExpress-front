import classes from "../../../sass/pages/home.module.scss";
import Card from "../../Card/Card";
import {Link} from "react-router-dom";
import {appRoutes} from "../../../utils/routes";
import clsx from "clsx";
import btnStyles from "../../../sass/components/button.module.scss";
import useCartStore from "../../../stores/cartStore";

function CartCta() {
	const cartItems = useCartStore(state => state.cartItems)
	return (
		<>
			<section className={classes['no-orders__section']}>
				<Card>
					<div className={classes['no-orders__cta-box']}>
						<p>{cartItems.length > 0 ? 'Chcesz dobrać kolejną dietę?' : 'Czas na następny krok'}</p>
						<Link to={appRoutes.diets} className={clsx(btnStyles.btn, btnStyles['btn--link'])}>Wybierz dietę</Link>
					</div>
				</Card>
			</section>
		</>
	)
}
export default CartCta