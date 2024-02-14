import {Dispatch, useEffect} from "react";
import {Control, useWatch} from "react-hook-form";
import {CartFormValues} from "../../../pages/Cart/CartPage";
import {calcDays} from "../../../utils/calcDays";
import btnStyles from  '../../../sass/components/button.module.scss'
interface CartTotalProps {
    cartStep: number,
    setCartStep: Dispatch<number>
    control: Control<CartFormValues>
    discount: number
}

function CartTotal({cartStep, setCartStep, discount, control}: CartTotalProps) {
    const formValues = useWatch<{
        calories: number,
        date: Date[],
        name: string,
        weekends: boolean,
        price: number
    }[]>({
        name: 'cart',
        control
    })
    const dailyPrice: number = formValues.reduce((acc, item) => {
        return acc + (item.price * (1 - discount))
    }, 0)
    const total: number = formValues.reduce((acc, item) => {
        return acc + (item.price * calcDays(item.date ? item.date[0] : new Date(), item.date ? item.date[1]  : new Date(), item.weekends) * (1-discount))
    }, 0)

    return (
        <div>
            <p>Cena za dzień: <span>{dailyPrice} zł</span></p>
            <p>Razem: <span>{total} zł</span></p>
            {cartStep === 0 && <button onClick={() => setCartStep(1)} className={btnStyles.btn}>Adres i płatność</button>}
            {cartStep === 1 && <button type={'submit'}>Zapłać za zamówienie</button>}
        </div>
    )
}

export default CartTotal