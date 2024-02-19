import {appRoutes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom";
import {Address} from "../../../types/dbtypes/Address";
import {Control, Controller, FieldValues, Path, useFormContext} from "react-hook-form";
import clsx from "clsx";
import cartClasses from "../../../sass/pages/cart.module.scss"
import btnStyles from '../../../sass/components/button.module.scss'
import {useState} from "react";

interface CartAddressesProps<T extends FieldValues> {
    addresses: Address[]
    name: string
    isAddressesLoading: boolean
    control: Control<T>
}

function CartAddresses<T extends FieldValues>({addresses, control, name, isAddressesLoading}: CartAddressesProps<T>) {
    const navigate = useNavigate()
    const [activeRadio, setActiveRadio] = useState<number>(-1);
    const {
        formState: {errors},
        watch
    } = useFormContext()
    const cartItems: {
        calories: number,
        date: Date[],
        name: string,
        weekends: boolean
    }[] = watch('cart')
    const isCartItemWeekend = cartItems.some(cartItem => cartItem.weekends)
    const filteredAddresses = isCartItemWeekend ? addresses.filter(address => address.is_weekend) : addresses;
    return (
        <Controller control={control} name={name as Path<T>} render={({field: {onChange}}) => (
            <div className={cartClasses.cart__addresses}>
                <h3>Adres</h3>
                <div
                    className={clsx(cartClasses.cart__addresses__container, cartClasses['snaps-inline'], filteredAddresses.length === 0 && cartClasses['cart__addresses__container--blank'])}>
                    {isAddressesLoading && <p>Pobieranie adresów...</p>}
                    {!isAddressesLoading && (
                        <>
                            {filteredAddresses.length === 0 &&
                                <p>Brak adresów {isCartItemWeekend && 'weekendowych'} 😥</p>}
                            {filteredAddresses.length > 0 && filteredAddresses.map((address, idx) => (
                                <label htmlFor={address._id} key={address._id}
                                       className={clsx(cartClasses['cart__addresses__item'], activeRadio === idx && cartClasses['cart__addresses__item--active'])}>
                                    <input type={"radio"} id={address._id} name={name} checked={address.isDefault}
                                           onClick={() => {
                                               onChange(address._id)
                                               setActiveRadio(idx)
                                           }
                                           }
                                    />
                                    <div>
                                        <h4>{`Adres ${idx + 1}`}</h4>
                                        <p>{`${address.street} ${address.building_no} ${address.apartment_no ? address.apartment_no : ''}`}</p>
                                        <p>{`${address.postal}, ${address.city}`}</p>
                                        <p>{address.isDefault && 'Domyślny adres'}</p>
                                    </div>
                                </label>
                            ))}
                        </>
                    )}
                </div>
                {errors[name] && (
                    <p className={cartClasses.cart__addresses__error}>{errors[name]!.message as string}</p>
                )}
                <button onClick={() => navigate(appRoutes.addresses)} className={btnStyles.btn}>Zarządzaj adresami
                </button>
            </div>
        )
        }/>
    )
}

export default CartAddresses