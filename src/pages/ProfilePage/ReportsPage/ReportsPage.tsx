import BackButton from "../../../components/BackBtn/BackButton";
import useAuthStore from "../../../stores/authStore";
import {useUserReportsQuery} from "../../../queries/reports/listing";
import ReportEntry from "../../../components/ReportEntry/ReportEntry";
import {Link} from "react-router-dom";
import {appRoutes} from "../../../utils/routes";

export default function ReportsPage() {
	const userData = useAuthStore(state => state.userData)
	const {data, isLoading} = useUserReportsQuery({id: userData.id, token: userData.token, pageSize: 0, pageIndex: 0})
	return (
		<section>
			<BackButton />
			<h1>Zgłoszenia</h1>
			{!isLoading &&
				<div>
					{data!.userReports.map(report => <ReportEntry reportData={report}/>)}
				</div>}
			<Link to={appRoutes.newReport}>Dodaj zgłoszenie</Link>
		</section>
	)
}