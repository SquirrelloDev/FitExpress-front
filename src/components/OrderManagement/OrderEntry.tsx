import Card from "../Card/Card";
import {IconPencil, IconSquareChevronDown, IconSquareChevronUp} from "@tabler/icons-react";
import {Address} from "../../types/dbtypes/Address";
import classes from "../../sass/pages/order-manage.module.scss";
import btnStyles from '../../sass/components/button.module.scss'
import clsx from "clsx";

interface OrderEntryProps {
    name: string,
    dietType: string,
    dietName: string,
    calories: number,
    subDate: {
        from: string,
        to: string
    }
    address: Address,
    index: number,
    openedItem: number,
	setOpenedItem: (idx: number) => void
}

function OrderEntry({name, dietType, dietName, calories, subDate, address, index, openedItem, setOpenedItem}: OrderEntryProps) {
    console.log("Render OrderEntry")
    return (
        <Card>
            <div className={classes.management__entry}>
                <div className={classes.management__entry__header}>
                    <h3>{name}</h3>
                    <button className={classes.management__entry__header__btn} onClick={() => setOpenedItem(index) }>{openedItem === index ? <IconSquareChevronUp/> : <IconSquareChevronDown/>}</button>
                </div>
                {openedItem === index && (
                    <>
                        <div className={classes.management__entry__info}>
                            <h4>Dane diety:</h4>
                            <p>Plan diety: {dietType}</p>
                            <p>Typ diety: {dietName}</p>
                            <p>Kaloryczność: {calories} kcal</p>
                            <p>Okres trwania planu:</p>
                            <p>{new Date(subDate.from).toLocaleDateString()} - {new Date(subDate.to).toLocaleDateString()}</p>
                            <p>Adres:</p>
                            <p>{address.street} {address.building_no}{address.apartment_no ? `/${address.apartment_no}` : ''}, {address.postal} {address.city}</p>
                        </div>
                        <hr className={classes.management__entry__divider}/>
                        <div className={classes.management__entry__actions}>
                            <button className={clsx(btnStyles.btn, btnStyles['btn--outline'], classes.management__entry__actions__btn)}><IconPencil/> Edycja diety</button>
                        </div>
                    </>
                )
                }
            </div>
        </Card>
    )
}

export default OrderEntry