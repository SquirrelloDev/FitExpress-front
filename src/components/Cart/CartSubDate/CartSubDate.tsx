import {Control, Controller, FieldValues, Path, useFormContext} from "react-hook-form";
import Checkbox from "../../Checkbox/Checkbox";
import inputStyles from '../../../sass/components/text-input.module.scss'
import ControlledRangedDatePicker from "../../Datepicker/ControlledRangedDatePicker";
import {calcDays} from "../../../utils/calcDays";
import classes from "../../../sass/pages/cart.module.scss";
import {registerLocale} from "react-datepicker";

interface CartSubDateProps<T extends FieldValues> {
    name: string
    control: Control<T, unknown>,
    prices: Record<string, number>
}
function CartSubDate<T extends FieldValues>({name, control, prices}: CartSubDateProps<T>) {
    const {watch} = useFormContext()
    const withWeekends = watch(`${name}.weekends`)
    const subDate = watch(`${name}.date`)
    const cals = watch(`${name}.calories`)
    const minDate = new Date().setDate(new Date().getDate() + 1)
    return (
        <div className={classes.cart__subdate}>
            <h3>Okres trwania diety</h3>
            <Controller control={control} name={`${name}.weekends` as Path<T>} render={() => (
                <div>
                    <Checkbox name={`${name}.weekends`} placeholder={'Czy dieta ma być dostarczana w weekend?'}
                              className={inputStyles.checkbox}/>
                </div>
            )}/>
            <ControlledRangedDatePicker control={control} name={`${name}.date`} inline
                                        filterDate={!withWeekends ? (date) => {
                                            const weekDay = new Date(date).getDay()
                                            return weekDay !== 0 && weekDay !== 6
                                            } : undefined
                                        } calendarStartDay={1} minDate={new Date(minDate)} locale={'pl'}/>
            <div className={classes.cart__subdate__info}>
                <p>Wybrany
                    okres: {subDate && (`${new Date(subDate[0]).toLocaleDateString()} - ${subDate[1] !== null ? new Date(subDate[1]).toLocaleDateString() as unknown as number : ''}`)}</p>
                <p>Cena za dzień: {cals ? `${prices[`kcal${cals}`].toFixed(2)} zł` : 'Wybierz kaloryczność'}</p>
                <p>Cena za wybrany
                    okres: {subDate ? `${(prices[`kcal${cals}`] * (subDate ? calcDays(subDate[0], subDate[1], withWeekends) : 1) as unknown as number).toFixed(2)} zł` : 'Wybierz okres'}</p>
            </div>
        </div>
    )
}

export default CartSubDate