import useHomeCalendar from "../../hooks/useHomeCalendar";
import classes from "../../sass/components/menu-calendar.module.scss";
import clsx from "clsx";
import {Dispatch, SetStateAction} from "react";
import {parseIntoMidnight} from "../../utils/dates";

interface MenuCalendarProps {
    currentDate: Date,
    currentDateListing: Date
    setCurrentDateListing: Dispatch<SetStateAction<Date>>
}

function MenuCalendar({currentDate, currentDateListing, setCurrentDateListing}: MenuCalendarProps) {
    // const matches = useMediaQuery('(min-width: 768px)');
    const days = useHomeCalendar(currentDate);
    return (
        <div className={classes.calendar}>
            <div className={clsx(classes.calendar__row, classes['snaps-inline'])}>
                {days.map(day => (
                    <label key={`${day.date}-${day.month}`} htmlFor={`${day.date}-${day.month}`} className={clsx(classes.calendar__row__item, currentDateListing.getDate() === Number(day.date) && classes['calendar__row__item--active'])}>
                        <input type={'radio'} id={`${day.date}-${day.month}`} name={'date'} defaultChecked={currentDate.getDate() === Number(day.date)} onClick={() => setCurrentDateListing(parseIntoMidnight((new Date(new Date().getFullYear(), Number(day.month) - 1, Number(day.date)))))}/>
                        <p>{day.date}</p>
                        <p>{day.name}</p>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default MenuCalendar