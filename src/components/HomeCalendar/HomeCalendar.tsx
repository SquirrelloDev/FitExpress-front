import Card from "../Card/Card";
import classes from "../../sass/pages/home.module.scss";
import {Order} from "../../types/dbtypes/Order";
import {useMediaQuery} from "@mantine/hooks";
import useHomeCalendar from "../../hooks/useHomeCalendar";
interface HomeCalendarProps {
	item: Order,
	currentDate: Date
}
function HomeCalendar({item, currentDate}:HomeCalendarProps) {
	const matches = useMediaQuery('(min-width: 768px)');
	const days = useHomeCalendar(currentDate);
	return (
		<Card>
			<div className={classes.standard__calendar}>
				<p>{item.flexi_tier ? "Wybierz posiłki" : "Przejrzyj menu"}</p>
				<div className={classes.standard__calendar__row}>
					<Card>
						<div className={classes.standard__calendar__item}>
							<p>{days[0].date}</p>
							<p>{days[0].name}</p>
						</div>
					</Card>
					<Card>
						<div className={classes.standard__calendar__item}>
							<p>{days[1].date}</p>
							<p>{days[1].name}</p>
						</div>
					</Card>
					<Card>
						<div className={classes.standard__calendar__item}>
							<p>{days[2].date}</p>
							<p>{days[2].name}</p>
						</div>
					</Card>
					{matches && (
						<>
							<Card>
								<div className={classes.standard__calendar__item}>
									<p>{days[3].date}</p>
									<p>{days[3].name}</p>
								</div>
							</Card>
							<Card>
								<div className={classes.standard__calendar__item}>
									<p>{days[4].date}</p>
									<p>{days[4].name}</p>
								</div>
							</Card>
							<Card>
								<div className={classes.standard__calendar__item}>
									<p>{days[5].date}</p>
									<p>{days[5].name}</p>
								</div>
							</Card>
							<Card>
								<div className={classes.standard__calendar__item}>
									<p>{days[6].date}</p>
									<p>{days[6].name}</p>
								</div>
							</Card>
						</>
					)}

				</div>
			</div>
		</Card>
	)
}
export default HomeCalendar