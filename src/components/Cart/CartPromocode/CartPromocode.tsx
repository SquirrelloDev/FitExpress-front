import inputStyles from '../../../sass/components/text-input.module.scss'
import btnStyles from '../../../sass/components/button.module.scss'
import {Dispatch, useEffect, useRef, useState} from "react";
import {useNamePromoQuery} from "../../../queries/promocodes/listing";
import classes from "../../../sass/pages/cart.module.scss";
interface CartPromocodeProps {
	token: string
	setCurrentDiscount: Dispatch<number>
}
function CartPromocode({token, setCurrentDiscount}:CartPromocodeProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	const [enteredPromo, setEnteredPromo] = useState<string>('')
	const {data, refetch, isSuccess, error, isError} = useNamePromoQuery({token, name:enteredPromo})
	const [blankErr, setBlankErr] = useState<boolean>(false)
	useEffect(() => {
		if(enteredPromo !== ''){
			refetch()
		}
	}, [data, enteredPromo, refetch])
	useEffect(() => {
		if(isSuccess){
			setCurrentDiscount(data!.promocode.discount)
		}
	}, [data, isSuccess, setCurrentDiscount])
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