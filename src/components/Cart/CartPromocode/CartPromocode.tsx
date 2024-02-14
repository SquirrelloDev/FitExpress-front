import {FormProvider, useForm} from "react-hook-form";
import inputStyles from '../../../sass/components/text-input.module.scss'
import {Dispatch, useEffect, useRef, useState} from "react";
import {useNamePromoQuery} from "../../../queries/promocodes/listing";
interface CartPromocodeProps {
	token: string
	setCurrentDiscount: Dispatch<number>
}
function CartPromocode({token, setCurrentDiscount}:CartPromocodeProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	const [enteredPromo, setEnteredPromo] = useState<string>('')
	const {data, refetch, isSuccess} = useNamePromoQuery({token, name:enteredPromo})
	useEffect(() => {
		if(enteredPromo !== ''){
			refetch()
		}
		console.log(data)
	}, [data, enteredPromo, refetch])
	useEffect(() => {
		if(isSuccess){
			setCurrentDiscount(data!.promocode.discount)
		}
	}, [data, isSuccess, setCurrentDiscount])
	const applyPromo = () => {
		setEnteredPromo(inputRef.current.value)
	}
	return (
		<>
			<div>
				<input type={'text'} ref={inputRef} className={inputStyles.input}/>
				<button onClick={applyPromo} type={'button'}>Zastosuj</button>
			</div>
		</>
	)
}
export default CartPromocode