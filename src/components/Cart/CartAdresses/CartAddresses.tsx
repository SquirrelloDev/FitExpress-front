import {appRoutes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom";
import {Address} from "../../../types/dbtypes/Address";
import {Control, Controller, FieldValues, Path, useFormContext} from "react-hook-form";
import clsx from "clsx";
import classes from "../../../sass/components/cart-calories-radio.module.scss";
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
    // const [filteredAddresses, setFilteredAddresses] = useState<Address[]>(addresses.filter(address => address.is_weekend === ));
    return (
        <Controller control={control} name={name as Path<T>} render={({field: {onChange}}) => (
            <>
                <h3>Adres</h3>
                <div>
					{isAddressesLoading && <p>Pobieranie adresów...</p>}
                    {!isAddressesLoading && (
                        <>
                            {addresses.length === 0 && <p>Brak adresów 😥</p>}
                            {addresses.length > 0 && addresses.map((address, idx) => (
                                <label htmlFor={address._id} key={address._id}
                                       className={clsx(classes['cart-calories-radio__group__radio-item'], activeRadio === idx && classes['cart-calories-radio__group__radio-item--active'])}>
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
                <button onClick={() => navigate(appRoutes.addresses)}>Zarządzaj adresami</button>
            </>
        )
        }/>
    )
}

export default CartAddresses