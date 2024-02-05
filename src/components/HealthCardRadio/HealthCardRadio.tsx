import classes from "../../sass/components/health-card-radio.module.scss";
import {useState} from "react";
import clsx from "clsx";
import {Control, Controller, FieldValues, Path, useFormContext} from "react-hook-form";
interface HealthCardRadioProps<T extends FieldValues> {
    name: string
    control: Control<T, unknown>
}
function HealthCardRadio<T extends FieldValues>({name, control}:HealthCardRadioProps<T>) {
    const [activeRadio, setActiveRadio] = useState<number>(0);
    const {formState: {errors}} = useFormContext();
    return (
        <Controller control={control} render={
            ({field: {onChange, onBlur}}) => (
                <div className={classes['hcard-radio']}>
                    <h3>Mój cel</h3>
                    <div className={classes['hcard-radio__group']}>
                        <label htmlFor={'burn'} className={clsx(classes['hcard-radio__group__radio-item'], activeRadio === 1 && classes['hcard-radio__group__radio-item--active'])}>
                            <input type='radio' id='burn' name='hcard-radio' onBlur={onBlur} onClick={() => {
                                onChange('burn');
                                setActiveRadio(1)
                            }
                            }/>
                            🔥 Chcę schudnąć</label>

                        <label htmlFor={'balance'} className={clsx(classes['hcard-radio__group__radio-item'], activeRadio === 2 && classes['hcard-radio__group__radio-item--active'])}>
                            <input type='radio' id='balance' name='hcard-radio' onBlur={onBlur} onClick={() => {
                                onChange('balance');
                                setActiveRadio(2)
                            }
                            }/>
                            ❤ Chcę zdrowo jeść</label>

                        <label htmlFor={'surplus'} className={clsx(classes['hcard-radio__group__radio-item'], activeRadio === 3 && classes['hcard-radio__group__radio-item--active'])}>
                            <input type='radio' id='surplus' name='hcard-radio' onBlur={onBlur} onClick={() => {
                                onChange('surplus');
                                setActiveRadio(3)
                            }}/>
                            💪 Chcę budować mięśnie</label>
                    </div>
                    {errors[name] &&(
                        <p>
                            {`${errors[name]?.message}`}
                        </p>
                    )}
                </div>
            )
        } name={name as Path<T>} />

    )
}

export default HealthCardRadio;