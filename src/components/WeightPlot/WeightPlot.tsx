import Card from "../Card/Card";
import {Link} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import classes from "../../sass/components/water-plot.module.scss";
import {IconHistory, IconPlus} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import BottomActionSheet from "../BottomActionSheet/BottomActionSheet";
import WeightAddSheet from "./WeightAddSheet/WeightAddSheet";
import {closestTo} from "date-fns";
import {calculateBMI, calculateBMIPercents} from "../../utils/calculateUserData";
import useBMICategory from "../../hooks/useBMICategory";
import {Progress} from "@mantine/core";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import clsx from "clsx";
import useChartData from "../../hooks/useChartData";

interface WeightPlotProps {
    token: string
    id: string
    weightArr: {date: Date, weight: number}[]
    firstWeight: number
    plannedWeight: number
    userHeight: number

}

function WeightPlot({id, token, weightArr, firstWeight, plannedWeight, userHeight}:WeightPlotProps) {
	const [opened, {open, close}] = useDisclosure(false)
    const dates = weightArr.map(weightDatum => new Date(weightDatum.date))
    const closestDate = closestTo(new Date(), dates);
    const displayedWeight = weightArr.find(weightItem => new Date(weightItem.date).getTime() === closestDate?.getTime())?.weight
    const {currentCategory} = useBMICategory()
    const {currentBMI: displayedBmi} = calculateBMI(userHeight, displayedWeight ? displayedWeight : firstWeight, plannedWeight);
    const displayedCategory = currentCategory(displayedBmi)
    const circlePosition = calculateBMIPercents(displayedBmi)
    const weightChartData = useChartData(weightArr)
    return (
        <>
            <Card clearPadding>
                <div className={classes.plot}>
                    <h2 className={classes.plot__heading}>Waga</h2>
                    <hr className={classes.plot__line}/>
                    <div className={classes.plot__weight}>
                        <div><p className={classes.plot__weight__text}>{weightArr.length !== 0 ? displayedWeight : firstWeight} kg</p> <p className={classes.plot__weight__subtext}>Obecna waga</p></div>
                        <div><p className={classes.plot__weight__text}>{plannedWeight} kg</p> <p className={classes.plot__weight__subtext}>Planowana waga</p></div>
                    </div>
                    <hr className={classes.plot__line}/>
                    <div className={classes.plot__bmi}>
					<h2>BMI</h2>
                        <div className={classes.plot__bmi__values}>
						<p>{displayedBmi}</p>
						<p>{displayedCategory.name}</p>
                        </div>
						<div className={classes.plot__progress}>
						<Progress.Root size={'xl'} radius={'lg'} classNames={{label: classes.plot__progress__label}}>
                            <Progress.Section value={10.42} color={'cyan'}>
                                <Progress.Label>.</Progress.Label>
                            </Progress.Section>
                            <Progress.Section value={27.1} color={'green'}>
                                <Progress.Label>.</Progress.Label>
                            </Progress.Section>
                            <Progress.Section value={20.83} color={'yellow'}>
                                <Progress.Label>.</Progress.Label>
                            </Progress.Section>
                            <Progress.Section value={20.84} color={'orange'}>
                                <Progress.Label>.</Progress.Label>
                            </Progress.Section>
                            <Progress.Section value={20.81} color={'red'}>
                                <Progress.Label>.</Progress.Label>
                            </Progress.Section>
                        </Progress.Root>
                            <div className={classes.plot__progress__circle} style={{left: `${circlePosition}%`}}></div>
						</div>
                    </div>
                    <hr className={classes.plot__line}/>
                    <div>
                        <ResponsiveContainer width={'100%'} height={300}>
                            <LineChart data={weightChartData} margin={{top: 30, right: 20, left: 0}}>
                                <CartesianGrid/>
                                <XAxis dataKey={'date'}/>
                                <YAxis label={{value: 'Waga w kg', angle: -90, position: 'insideLeft', offset: 15}}/>
                                <Line dataKey={'weight'}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
					<div className={clsx(classes.plot__actions, classes['plot__actions--padding'])}>
						<Link to={appRoutes.weightHistory} className={clsx(classes.plot__actions__history, classes['plot__actions__history--weight'])}><IconHistory/></Link>
						<button onClick={open} className={clsx(classes.plot__actions__add, classes['plot__actions__add--weight'])}><IconPlus/></button>
					</div>
                </div>
            </Card>
			<BottomActionSheet opened={opened} close={close} withCloseButton={false} size={'xl'}>
                <WeightAddSheet id={id} token={token} close={close} dates={dates} />
			</BottomActionSheet>
        </>
    )
}
export default WeightPlot