import React, {useState} from "react";
import {TailSpin} from "react-loader-spinner";

interface AddressAvailabilityProps {
    debouncedArr: string[]
    inRange?: boolean,
}

export function AddressAvailability({debouncedArr, inRange}: AddressAvailabilityProps) {
    return (
        <div>
            <p>{debouncedArr.some(field => !field) ? 'Wprowadź dane adresowe' : inRange ? 'Adres dostępny' : inRange === undefined ? 'Sprawdzam adres' : 'Adres niedostępny'}</p>
        </div>
    )
}

export default React.memo(AddressAvailability)