import useUserProgressQuery from "../../queries/progress-entry/listing";
import useAuthStore from "../../stores/authStore";
import Card from "../../components/Card/Card";
import {IconCalendarEvent, IconChevronLeft, IconEdit, IconScaleOutline, IconTrashX} from "@tabler/icons-react";
import BottomActionSheet from "../../components/BottomActionSheet/BottomActionSheet";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import WeightEditSheet from "../../components/WeightPlot/WeightEditSheet/WeightEditSheet";
import DeleteSheet from "../../components/EntryDeleteSheet/DeleteSheet";
import classes from "../../sass/pages/entry-history.module.scss";
import {useNavigate} from "react-router-dom";

function WeightHistory() {
    const navigate = useNavigate()
    const userData = useAuthStore((state) => state.userData)
    const {data: progressData, isLoading: isProgressLoading} = useUserProgressQuery({
        id: userData.id,
        token: userData.token
    })
    const [opened, {open, close}] = useDisclosure(false)
    const [openedDelete, {open: openDelete, close: closeDelete}] = useDisclosure(false)
    const [selectedEntry, setSelectedEntry] = useState<{ date: Date, weight: number }>({date: new Date(), weight: 0})
    return (
        <section className={classes.history}>
            <h1>Historia wpisów</h1>
            <button onClick={() => navigate(-1)} className={classes.history__back}><IconChevronLeft
                color={'#fff'} size={30}/></button>
            <div>
                {!isProgressLoading && (
                    <>
                        {progressData!.data.weight_progress.length === 0 && <div className={classes.blank}><p>Brak wpisów</p></div>}
                        {progressData!.data.weight_progress.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(weightItem => (
                            <Card clearPadding>
                                <div className={classes.history__item}>
                                    <p className={classes['history__icon-text']}>
                                        <IconCalendarEvent/> {new Date(weightItem.date).toLocaleDateString()}</p>
                                    <div className={classes['history__item__second-row']}>
                                        <p className={classes['history__icon-text']}>
                                            <IconScaleOutline/> {weightItem.weight} kg</p>
                                        <div className={classes.history__actions}>
                                            <button onClick={() => {
                                                setSelectedEntry({
                                                    date: new Date(weightItem.date),
                                                    weight: weightItem.weight
                                                })
                                                open()
                                            }
                                            }><IconEdit/></button>
                                            <button onClick={() => {
                                                setSelectedEntry({
                                                    date: new Date(weightItem.date),
                                                    weight: weightItem.weight
                                                })
                                                openDelete()
                                            }}><IconTrashX/></button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                        <BottomActionSheet opened={opened} close={close} size={'xl'} withCloseButton={false}>
                            <WeightEditSheet id={userData.id} token={userData.token} close={close}
                                             dates={progressData!.data.weight_progress.map(waterItem => new Date(waterItem.date))}
                                             defValue={selectedEntry}/>
                        </BottomActionSheet>
                        <BottomActionSheet opened={openedDelete} close={closeDelete} size={'35%'}
                                           withCloseButton={false}>
                            <DeleteSheet close={closeDelete} userId={userData.id} token={userData.token}
                                         date={new Date(selectedEntry.date)} kind={"weight"}/>
                        </BottomActionSheet>
                    </>
                )}
            </div>
        </section>
    )
}

export default WeightHistory