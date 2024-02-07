const shortWeekDays = [
    {value: 0, label: 'Nd.'},
    {value: 1, label: 'Pn.'},
    {value: 2, label: 'Wt.'},
    {value: 3, label: 'Śr.'},
    {value: 4, label: 'Cz.'},
    {value: 5, label: 'Pt.'},
    {value: 6, label: 'Sb.'},
]
function useHomeCalendar(currentDate: Date) {
    const days: {date: string, name: string}[] = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(currentDate);
        day.setDate(currentDate.getDate() + i);
        const dayOfWeek = shortWeekDays.find(el => el.value === day.getDay())!.label
        days.push({date: day.toISOString().slice(8, 10), name: dayOfWeek})

    }
    return days
}
export default useHomeCalendar