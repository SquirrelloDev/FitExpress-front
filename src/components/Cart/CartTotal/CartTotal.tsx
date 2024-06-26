import {Dispatch} from "react";
import {Control, useWatch} from "react-hook-form";
import {calcDays} from "../../../utils/calcDays";
import btnStyles from '../../../sass/components/button.module.scss'
import classes from "../../../sass/pages/cart.module.scss";
import {CartFormValues} from "../../../pages/Cart/CartPage";

interface CartTotalProps {
    cartStep: number,
    setCartStep: Dispatch<number>
    control: Control<CartFormValues>
    discount: number
}

function CartTotal({cartStep, setCartStep, discount, control}: CartTotalProps) {
    // @ts-expect-error watch is an array
    const formValues = useWatch<{ calories: number, date: Date[], name: string, weekends: boolean, price: number }[]>({name: 'cart', control: control})
    const dailyPrice: number = formValues!.reduce((acc, item) => {
        return acc + (item.price! * (1 - discount))
    }, 0)
    const total: number = formValues!.reduce((acc, item) => {
        return acc + (item.price! * calcDays(item.date ? item.date[0] : new Date(), item.date ? item.date[1] : new Date(), item.weekends) as unknown as number * (1 - discount))
    }, 0)
    const nextStepAvailable = formValues.length > 0 ? formValues?.every(item => {
        let nameValid = false, caloriesValid = false, dateValid = false;
        if(item.name !== ''){
            nameValid = true
        }
        if(item.calories){
            caloriesValid = true
        }
        if(item.date && item.date[0] && item.date[1]){
            dateValid = true
        }
        return nameValid && caloriesValid && dateValid
    }) : false
    return (
        <div className={classes.cart__total}>
            <div className={classes.cart__total__text}>
                <p>Cena za dzień: </p>
                <p>{isNaN(dailyPrice) ? '0.00' : dailyPrice.toFixed(2)} zł</p>
                <p>Razem: </p>
                <p>{isNaN(total) ? '0.00' : total.toFixed(2)} zł</p>
            </div>
            {cartStep === 0 &&
                <button onClick={() => setCartStep(1)} disabled={!nextStepAvailable} className={btnStyles.btn}>Adres i płatność</button>}
            {cartStep === 1 && <button type={'submit'} className={btnStyles.btn}>Zapłać za zamówienie</button>}
        </div>
    )
}

export default CartTotal