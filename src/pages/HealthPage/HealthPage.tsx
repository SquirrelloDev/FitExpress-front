import UserHealthCard from "../../components/UserHealthCard/UserHealthCard";
import {useOneUserListQuery} from "../../queries/user/listing";
import useAuthStore from "../../stores/authStore";

function HealthPage() {
	const userData = useAuthStore((state) => state.userData)
	const {data, isLoading} = useOneUserListQuery({id: userData.id, token: userData.token})
	return (
		<section>
			<h1>Zdrowie</h1>
			{!isLoading &&(
				<UserHealthCard healthData={data!.user.health_data}/>
			)}

		</section>
	)
}
export default HealthPage