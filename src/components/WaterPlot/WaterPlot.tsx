import Card from "../Card/Card";
import {Progress} from "@mantine/core";
import {IconHistory, IconPlus} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import BottomActionSheet from "../BottomActionSheet/BottomActionSheet";
import {useDisclosure} from "@mantine/hooks";
import WaterAddSheet from "./WaterAddSheet/WaterAddSheet";
import {percents} from "../../utils/calcDays";
import {isToday} from "date-fns";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis} from "recharts";
import useWaterChart from "../../hooks/useWaterChart";

interface WaterPlotProps {
    waterArr: { date: Date, water: number }[]
    maxWater: number,
    token: string,
    id: string
}

function WaterPlot({waterArr, maxWater, id, token}: WaterPlotProps) {
    const [opened, {open, close}] = useDisclosure(false)
    const todayWater = waterArr.find(waterItem => isToday(waterItem.date))?.water
    const percentValue = percents(maxWater, todayWater)
    console.log(waterArr, todayWater, percentValue)
    const waterChartData = useWaterChart(waterArr);
    const dates = waterArr.map(waterDatum => new Date(new Date(waterDatum.date).setHours(0,0,0,0)));
    return (
        <>
            <Card>
                <div>
                    <div>
                        <h2>Woda</h2>
                        <p>{todayWater ? (todayWater / 1000).toFixed(2) : '0.00'} z {(maxWater / 1000).toFixed(2)}l</p>
                    </div>
                    <div>
                        <Progress.Root size={'xxl'} radius={'lg'}>
                            <Progress.Section value={percentValue ? Math.floor(percentValue) : 0}>
                                <Progress.Label>{percentValue ? Math.floor(percentValue) : 0}%</Progress.Label>
                            </Progress.Section>
                        </Progress.Root>
                    </div>
                    <div>
                        <ResponsiveContainer width='100%' height={300}>
                        <BarChart data={waterChartData} margin={{top: 30, right: 20, left: 0}}>
                            <CartesianGrid/>
                            <XAxis dataKey={'date'} />
                            <YAxis/>
                            <Bar dataKey={'water'} fill={'#228be6'}/>
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <Link to={appRoutes.waterHistory}><IconHistory/></Link>
                        <button onClick={open}><IconPlus/></button>
                    </div>
                </div>
            </Card>
            <BottomActionSheet opened={opened} close={close} withCloseButton={false} size={'xl'}>
                <WaterAddSheet id={id} token={token} close={close} dates={dates}/>
            </BottomActionSheet>
        </>
    )
}

export default WaterPlot