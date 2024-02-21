import {useMemo} from "react";

function useWaterChart(waterData: {date: Date, water: number}[]) {
    const waterChartData = useMemo(() => {
        return waterData.filter((waterItem, idx) => idx < 7).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(waterDatum => ({date: new Date(waterDatum.date).toLocaleDateString(), water: (waterDatum.water / 1000).toFixed(2)}))
    }, [waterData])
    return waterChartData
}
export default useWaterChart