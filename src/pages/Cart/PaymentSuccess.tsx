import {IconCheck} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import btnStyles from '../../sass/components/button.module.scss'
import classes from "../../sass/pages/payment-success.module.scss";
import useCartStore from "../../stores/cartStore";
import {useEffect} from "react";
function PaymentSuccess() {
	const navigate = useNavigate()
	const cartItems = useCartStore(state => state.cartItems)
	const clearCart = useCartStore(state => state.clearCart);
	useEffect(() => {
		if(cartItems.length > 0){
			clearCart()
		}
	}, [cartItems.length, clearCart])
	return (
		<div className={classes.success}>
			<div className={classes.success__circle}>
				<IconCheck size={50}/>
			</div>
			<div className={classes.success__text}>
			<h3>Zamówienie przyjęte</h3>
			<p>Otrzymasz od nas fakturę i potwierdzenie płatności na Twój adres mailowy</p>
			<button onClick={() => navigate(appRoutes.home)} className={btnStyles.btn}>Powrót do ekranu głównego</button>
			</div>
		</div>
	)
}
export default PaymentSuccess