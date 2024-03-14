import {useMemo} from "react";

function useChartData(data: {date: Date, water?: number, weight? :number}[]) {
    const chartData = useMemo(() => {
        // @ts-expect-error only index is needed
        return data.filter((item, idx) => idx < 7).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(datum => (
            {
                date: new Date(datum.date).toLocaleDateString(),
                ...(datum.water && { water: (datum.water).toFixed(2)}),
                ...(datum.weight && { weight: datum.weight}),
            }))
    }, [data])
    return chartData
}
export default useChartData