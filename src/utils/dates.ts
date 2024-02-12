export const parseIntoMidnight = (date: Date): Date => {
    const dateObj = new Date(date);
    const midnight = dateObj.setHours(1,0,0,0);
    return new Date(midnight)
}