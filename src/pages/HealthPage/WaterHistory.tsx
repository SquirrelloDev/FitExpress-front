import useUserProgressQuery from "../../queries/progress-entry/listing";
import useAuthStore from "../../stores/authStore";
import Card from "../../components/Card/Card";
import {IconCalendarEvent, IconDroplet, IconEdit, IconTrashX} from "@tabler/icons-react";
import BottomActionSheet from "../../components/BottomActionSheet/BottomActionSheet";
import {useDisclosure} from "@mantine/hooks";
import WaterEditSheet from "../../components/WaterPlot/WaterEditSheet/WaterEditSheet";
import {useState} from "react";
import WaterDeleteSheet from "../../components/WaterPlot/WaterDeleteSheet/WaterDeleteSheet";

function WaterHistory() {
	const userData = useAuthStore((state) => state.userData)
	const {data: progressData, isLoading: isProgressLoading} = useUserProgressQuery({id: userData.id, token: userData.token})
	const [opened, {open, close}] = useDisclosure(false)
	const [openedDelete, {open: openDelete, close: closeDelete}] = useDisclosure(false)
	const [selectedEntry, setSelectedEntry] = useState<{date: Date, water: number}>({date: new Date(), water: 0})
	return (
		<section>
			<h1>Historia wpisów</h1>

			<div>
			{!isProgressLoading && (
				<>
				{progressData?.data.water_progress.map(waterItem => (
					<Card>
						<p><IconCalendarEvent /> {new Date(waterItem.date).toLocaleDateString()}</p>
						<div>
							<p><IconDroplet/> {waterItem.water} ml</p>
							<button onClick={() => {
								setSelectedEntry({date: new Date(waterItem.date), water: waterItem.water})
								open()
							}
							}><IconEdit/></button>
							<button onClick={() => {
								setSelectedEntry({date: new Date(waterItem.date), water: waterItem.water})
								openDelete()
							}}><IconTrashX/></button>
						</div>
					</Card>
				))}
					<BottomActionSheet opened={opened} close={close} size={'xl'} withCloseButton={false}>
						<WaterEditSheet id={userData.id} token={userData.token} close={close} dates={progressData?.data.water_progress.map(waterItem => new Date(waterItem.date))} defValue={selectedEntry} />
					</BottomActionSheet>
					<BottomActionSheet opened={openedDelete} close={closeDelete} size={'20%'} withCloseButton={false}>
						<WaterDeleteSheet close={closeDelete} userId={userData.id} token={userData.token} date={new Date(selectedEntry.date)}/>
					</BottomActionSheet>
				</>
			)}
			</div>
		</section>
	)
}
export default WaterHistory