import {Control, Controller, FieldValues, Path, useFormContext} from "react-hook-form";
import {useState} from "react";
import classes from '../../../sass/components/cart-calories-radio.module.scss'
import clsx from "clsx";
import useUserPrefs from "../../../hooks/useUserPrefs";

interface CartCaloriesRadio<T extends FieldValues> {
    name: string
    control: Control<T, unknown>,
    prices: Record<string, number>
}

function CartCaloriesRadio<T extends FieldValues>({name, control, prices}: CartCaloriesRadio<T>) {
	const {assignHelperBadges} = useUserPrefs();
    const [activeRadio, setActiveRadio] = useState<number>(-1);
    const availableCalories = Object.keys(prices).map(cal => Number(cal.slice(4)));
	const helperBadges = assignHelperBadges(availableCalories)
    const {formState: {errors}} = useFormContext();
    return (
        <Controller control={control} render={
            ({field: {onChange, onBlur}}) => (
                <div className={classes['cart-calories-radio']}>
                    <div className={classes['cart-calories-radio__group']}>
                        {availableCalories.map((cal, idx) => {
							const badge = helperBadges.find(badge => badge.value === cal)?.name;
							return (
								<label htmlFor={`${cal}kcal`} key={`${cal}kcal`} className={clsx(classes['cart-calories-radio__group__radio-item'], activeRadio === idx && classes['cart-calories-radio__group__radio-item--active'])}>
									<input type={"radio"} id={`${cal}kcal`} name={name} onClick={() => {
										onChange(cal)
										setActiveRadio(idx)
									}
									}
									/>
									<div>
										<p>{cal}</p>
										<p>kcal</p>
									</div>
									{badge && <p className={classes['cart-calories-radio__group__radio-item__badge']}>{badge}</p>}
								</label>

							)
						})}
                    </div>
                    {errors[name] && (
                        <p>
                            {`${errors[name]?.message}`}
                        </p>
                    )}
                </div>
            )
        } name={name as Path<T>}/>
    )
}

export default CartCaloriesRadio