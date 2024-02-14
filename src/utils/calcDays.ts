export function calcDays(startDate: Date, endDate: Date, countWeekends = true) {
    if (!endDate) {
        return 'Wybierz końcową datę'
    }
    const currentDate = new Date(startDate);
    let days = 0;

    while (currentDate <= endDate) {
        // Check if the current date is not a weekend (Saturday or Sunday)
        if (!countWeekends) {
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                days++;
            }

        } else {
            days++
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;

}

export function calcDaysBetween(startDate: Date, endDate: Date) {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return days
}

export function percents(maxVal: number, unknownVal: number) {
    return Math.floor((unknownVal * 100) / maxVal);
}