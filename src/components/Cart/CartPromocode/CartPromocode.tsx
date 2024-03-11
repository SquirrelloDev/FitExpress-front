import inputStyles from '../../../sass/components/text-input.module.scss'
import btnStyles from '../../../sass/components/button.module.scss'
import {Dispatch, useEffect, useRef, useState} from "react";
import {useNamePromoQuery} from "../../../queries/promocodes/listing";
import classes from "../../../sass/pages/cart.module.scss";
import useCartStore from "../../../stores/cartStore";
import {toast} from "react-hot-toast";
interface CartPromocodeProps {
	token: string
	setCurrentDiscount: Dispatch<number>
	userId: string
}
function CartPromocode({token, setCurrentDiscount, userId}:CartPromocodeProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	const [enteredPromo, setEnteredPromo] = useState<string>('')
	const {data, refetch, isSuccess, error, isError} = useNamePromoQuery({token, name:enteredPromo, userId})
	const [blankErr, setBlankErr] = useState<boolean>(false)
	const applyPromocode = useCartStore(state => state.applyPromocode)
	useEffect(() => {
		if(enteredPromo !== ''){
			refetch()
		}
	}, [data, enteredPromo, refetch])
	useEffect(() => {
		if(isSuccess){
			applyPromocode(data!.promocode._id)
			setCurrentDiscount(data!.promocode.discount)
			toast.success('Zniżka zaaplikowana!')
		}
	}, [applyPromocode, data, isSuccess, setCurrentDiscount])
	const applyPromo = () => {
		if(inputRef.current!.value !== ''){
		setEnteredPromo(inputRef.current!.value);
		setBlankErr(false)
		}
		else{
			setBlankErr(true)
		}
	}
	return (
		<>
			<div className={classes.cart__promo}>
				<h3>Kod promocyjny</h3>
				<input type={'text'} ref={inputRef} className={inputStyles.input}/>
				{blankErr && <p className={classes.cart__promo__error}>Wprowadź kod</p>}
				{isError && <p className={classes.cart__promo__error}>{(error as Error).message}</p>}
				<button onClick={applyPromo} type={'button'} className={btnStyles.btn}>Zastosuj</button>
			</div>
		</>
	)
}
export default CartPromocode