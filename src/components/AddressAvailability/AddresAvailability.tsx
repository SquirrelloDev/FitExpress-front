import React, {useState} from "react";
import {TailSpin} from "react-loader-spinner";
import classes from "../../sass/pages/address-form-page.module.scss";

interface AddressAvailabilityProps {
    debouncedArr: string[]
    inRange?: boolean,
}

export function AddressAvailability({debouncedArr, inRange}: AddressAvailabilityProps) {
    return (
        <div className={classes.page__form__availability}>
            <p>{debouncedArr.some(field => !field) ? 'Wprowadź dane adresowe' : inRange ? 'Adres dostępny' : inRange === undefined ? 'Sprawdzam adres' : 'Adres niedostępny'}</p>
        </div>
    )
}

export default React.memo(AddressAvailability)