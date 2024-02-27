import React from "react";
import classes from "../../sass/pages/address-form-page.module.scss";
import {IconCircleCheckFilled, IconCircleXFilled} from "@tabler/icons-react";

interface AddressAvailabilityProps {
    debouncedArr: string[]
    inRange?: boolean,
}

export function AddressAvailability({debouncedArr, inRange}: AddressAvailabilityProps) {
    return (
        <div className={classes.page__form__availability}>
            {inRange ? <IconCircleCheckFilled color={'#46C367FF'}/> : inRange === undefined ? '' : <IconCircleXFilled color={'#B81515FF'}/>}
            <p>{debouncedArr.some(field => !field) ? 'Wprowadź dane adresowe' : inRange ? 'Adres dostępny' : inRange === undefined ? 'Sprawdzam adres' : 'Adres niedostępny'}</p>
        </div>
    )
}

export default React.memo(AddressAvailability)