import useUserProgressQuery from "../../queries/progress-entry/listing";
import useAuthStore from "../../stores/authStore";
import Card from "../../components/Card/Card";
import {IconCalendarEvent, IconDroplet, IconEdit, IconTrashX} from "@tabler/icons-react";
import BottomActionSheet from "../../components/BottomActionSheet/BottomActionSheet";
import {useDisclosure} from "@mantine/hooks";
import WaterEditSheet from "../../components/WaterPlot/WaterEditSheet/WaterEditSheet";
import {useState} from "react";
import classes from "../../sass/pages/entry-history.module.scss";
import DeleteSheet from "../../components/EntryDeleteSheet/DeleteSheet";
import BackButton from "../../components/BackBtn/BackButton";

function WaterHistory() {
    const userData = useAuthStore((state) => state.userData)
    const {data: progressData, isLoading: isProgressLoading} = useUserProgressQuery({
        id: userData.id,
        token: userData.token
    })
    const [opened, {open, close}] = useDisclosure(false)
    const [openedDelete, {open: openDelete, close: closeDelete}] = useDisclosure(false)
    const [selectedEntry, setSelectedEntry] = useState<{ date: Date, water: number }>({date: new Date(), water: 0})
    return (
        <section className={classes.history}>
            <h1>Historia wpisów</h1>
            <BackButton />
            <div>
                {!isProgressLoading && (
                    <>
                        {progressData!.data.water_progress.length === 0 && <div className={classes.blank}><p>Brak wpisów</p></div>}
                        {progressData!.data.water_progress.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(waterItem => (
                            <Card clearPadding>
                                <div className={classes.history__item}>
                                    <p className={classes['history__icon-text']}>
                                        <IconCalendarEvent/> {new Date(waterItem.date).toLocaleDateString()}</p>
                                    <div className={classes['history__item__second-row']}>
                                        <p className={classes['history__icon-text']}><IconDroplet/> {waterItem.water} ml
                                        </p>
                                        <div className={classes.history__actions}>
                                            <button onClick={() => {
                                                setSelectedEntry({
                                                    date: new Date(waterItem.date),
                                                    water: waterItem.water
                                                })
                                                open()
                                            }
                                            }><IconEdit/></button>
                                            <button onClick={() => {
                                                setSelectedEntry({
                                                    date: new Date(waterItem.date),
                                                    water: waterItem.water
                                                })
                                                openDelete()
                                            }}><IconTrashX/></button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                        <BottomActionSheet opened={opened} close={close} size={'xl'} withCloseButton={false}>
                            <WaterEditSheet id={userData.id} token={userData.token} close={close}
                                            dates={progressData!.data.water_progress.map(waterItem => new Date(waterItem.date))}
                                            defValue={selectedEntry}/>
                        </BottomActionSheet>
                        <BottomActionSheet opened={openedDelete} close={closeDelete} size={'35%'}
                                           withCloseButton={false}>
                            <DeleteSheet close={closeDelete} userId={userData.id} token={userData.token}
                                         date={new Date(selectedEntry.date)} kind={'water'}/>
                        </BottomActionSheet>
                    </>
                )}
            </div>
        </section>
    )
}

export default WaterHistory