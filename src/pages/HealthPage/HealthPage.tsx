import UserHealthCard from "../../components/UserHealthCard/UserHealthCard";
import {useOneUserListQuery} from "../../queries/user/listing";
import useAuthStore from "../../stores/authStore";
import classes from "../../sass/pages/health-page.module.scss";
import WaterPlot from "../../components/WaterPlot/WaterPlot";
import useUserProgressQuery from "../../queries/progress-entry/listing";

function HealthPage() {
	const userData = useAuthStore((state) => state.userData)
	const {data, isLoading} = useOneUserListQuery({id: userData.id, token: userData.token})
	const {data: progressData, isLoading: isProgressLoading} = useUserProgressQuery({id: userData.id, token: userData.token})
	return (
		<section className={classes.health}>
			<h1>Zdrowie</h1>
			{(!isLoading && !isProgressLoading) &&(
				<>
				<UserHealthCard healthData={data!.user.health_data}/>
				<WaterPlot waterArr={progressData!.data.water_progress} maxWater={data!.user.health_data.water_demand} id={userData.id} token={userData.token}/>
				</>
			)}

		</section>
	)
}
export default HealthPage