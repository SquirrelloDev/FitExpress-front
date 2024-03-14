import UserHealthCard from "../../components/UserHealthCard/UserHealthCard";
import {useOneUserListQuery} from "../../queries/user/listing";
import useAuthStore from "../../stores/authStore";
import classes from "../../sass/pages/health-page.module.scss";
import WaterPlot from "../../components/WaterPlot/WaterPlot";
import useUserProgressQuery from "../../queries/progress-entry/listing";
import WeightPlot from "../../components/WeightPlot/WeightPlot";
import {Grid} from "react-loader-spinner";
import {Alert} from "@mantine/core";
import alertStyles from "../../sass/components/alert.module.scss";

function HealthPage() {
    const userData = useAuthStore((state) => state.userData)
    const {data, isLoading, isError, isSuccess} = useOneUserListQuery({id: userData.id, token: userData.token})
    const {
        data: progressData,
        isLoading: isProgressLoading,
        isError: isProgressError,
        isSuccess: isProgressSuccess
    } = useUserProgressQuery({id: userData.id, token: userData.token})
    return (
        <section className={classes.health}>
            <h1>Zdrowie</h1>
            {(isLoading || isProgressLoading) && (
                <Grid/>
            )}
            {(isError || isProgressError) && (
                <Alert variant={'light'} title={'Wystąpił błąd'} color={'red'} classNames={{
                    root: alertStyles.alert,
                    title: alertStyles.alert__title,
                    message: alertStyles.alert__message
                }}>
                    Coś poszło nie tak
                </Alert>
            )}
            {(isSuccess && isProgressSuccess) && (
                <>
                    <div className={classes.health__stats}>
                    <UserHealthCard healthData={data!.user.health_data}/>
                        <WeightPlot token={userData.token} id={userData.id}
                                    weightArr={progressData!.data.weight_progress}
                                    firstWeight={data!.user.health_data.user_weight_current}
                                    plannedWeight={data!.user.health_data.user_weight_planned}
                                    userHeight={data!.user.health_data.user_height}/>
                        <WaterPlot waterArr={progressData!.data.water_progress}
                                   maxWater={data!.user.health_data.water_demand} id={userData.id}
                                   token={userData.token}/>
                    </div>
                </>
            )}

        </section>
    )
}

export default HealthPage