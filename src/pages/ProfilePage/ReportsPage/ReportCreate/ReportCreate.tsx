import BackButton from "../../../../components/BackBtn/BackButton";
import ReportForm from "../../../../components/ReportForm/ReportForm";
import useUserOrdersQuery from "../../../../queries/user/userOrders";
import useAuthStore from "../../../../stores/authStore";
import classes from "../../../../sass/pages/report-create.module.scss";

export default function ReportCreate() {
	const userData = useAuthStore(state => state.userData)
	const {data, isLoading} = useUserOrdersQuery({id: userData.id, token: userData.token})
	return (
		<section className={classes.create}>
			<BackButton />
			<h1>Nowe zgłoszenie</h1>
			{!isLoading && <ReportForm orders={data!.orders} userData={userData}/>}
		</section>
	)
}