export function calcDays(startDate: Date, endDate: Date){
    const timeDiff = endDate - startDate;
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return days
}
export function percents(maxVal: number, unknownVal: number) {
    return Math.floor((unknownVal * 100) / maxVal);
}