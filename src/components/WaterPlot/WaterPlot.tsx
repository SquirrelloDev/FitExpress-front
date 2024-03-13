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
import classes from "../../sass/components/water-plot.module.scss";
import useChartData from "../../hooks/useChartData";

interface WaterPlotProps {
    waterArr: { date: Date, water: number }[]
    maxWater: number,
    token: string,
    id: string
}

function WaterPlot({waterArr, maxWater, id, token}: WaterPlotProps) {
    const [opened, {open, close}] = useDisclosure(false)
    const todayWater = waterArr.find(waterItem => isToday(waterItem.date))?.water
    const percentValue = percents(maxWater, todayWater ? todayWater : 0)
    const waterChartData = useChartData(waterArr);
    const dates = waterArr.map(waterDatum => new Date(waterDatum.date));
    return (
        <>
            <Card>
                <div className={classes.plot}>
                    <div className={classes.plot__header}>
                        <h2>Woda</h2>
                        <p className={classes.plot__header__values}>{todayWater ? todayWater : '0'} z {maxWater}ml</p>
                    </div>
                    <div>
                        <Progress.Root size={'xxl'} radius={'lg'} classNames={{root: classes.plot__progress__root, section: classes.plot__progress__section}}>
                            <Progress.Section value={percentValue}>
                                <Progress.Label>{percentValue ? Math.floor(percentValue) : 0}%</Progress.Label>
                            </Progress.Section>
                        </Progress.Root>
                    </div>
                    <div>
                        <ResponsiveContainer width='100%' height={300}>
                        <BarChart data={waterChartData} margin={{top: 30, right: 20, left: 0}}>
                            <CartesianGrid/>
                            <XAxis dataKey={'date'} />
                            <YAxis label={{value: 'ilość w ml', angle: -90, position: 'insideLeft'}}/>
                            <Bar dataKey={'water'} fill={'#228be6'}/>
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={classes.plot__actions}>
                        <Link to={appRoutes.waterHistory} className={classes.plot__actions__history}><IconHistory/></Link>
                        <button onClick={open} className={classes.plot__actions__add}><IconPlus/></button>
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