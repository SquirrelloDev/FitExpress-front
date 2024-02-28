import BackButton from "../../../components/BackBtn/BackButton";
import useAuthStore from "../../../stores/authStore";
import {useUserReportsQuery} from "../../../queries/reports/listing";
import ReportEntry from "../../../components/ReportEntry/ReportEntry";
import {Link} from "react-router-dom";
import {appRoutes} from "../../../utils/routes";
import btnStyles from '../../../sass/components/button.module.scss'
import classes from "../../../sass/pages/report-page.module.scss";
import clsx from "clsx";

export default function ReportsPage() {
	const userData = useAuthStore(state => state.userData)
	const {data, isLoading} = useUserReportsQuery({id: userData.id, token: userData.token, pageSize: 0, pageIndex: 0})
	return (
		<section className={classes.reports}>
			<BackButton />
			<h1>Zgłoszenia</h1>
			{!isLoading &&
				<div>
					{data!.userReports.length === 0 && <p>Brak zgłoszeń do wyświetlenia</p>}
					{data!.userReports.map(report => <ReportEntry key={report._id} reportData={report} token={userData.token}/>)}
				</div>}
			<Link to={appRoutes.newReport} className={clsx(btnStyles.btn, btnStyles['btn--link'], classes.reports__add)}>Dodaj zgłoszenie</Link>
		</section>
	)
}