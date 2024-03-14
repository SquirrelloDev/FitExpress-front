import Card from "../Card/Card";
import {Report} from "../../types/dbtypes/Report";
import {IconChevronDown, IconChevronUp, IconTrashX} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import useReportStausCategory from "../../hooks/useReportStausCategory";
import BottomActionSheet from "../BottomActionSheet/BottomActionSheet";
import ReportDeleteSheet from "../ReportDeleteSheet/ReportDeleteSheet";
import btnStyles from '../../sass/components/button.module.scss'
import classes from "../../sass/pages/report-page.module.scss";
import clsx from "clsx";

interface ReportEntryProps {
    reportData: Report
    token: string
}

export default function ReportEntry({reportData, token}: ReportEntryProps) {
    const [opened, {toggle}] = useDisclosure(false)
    const [sheetOpen, {open, close}] = useDisclosure(false)
    const {statusPL, categoryPL} = useReportStausCategory(reportData.report_status, reportData.category)
    return (
        <Card>
            <div className={classes.reports__entry}>
                <div className={classes.reports__entry__data}>
                    <p>id zgłoszenia: {reportData._id}</p>
                    <p>Rodzaj zgłoszenia: {categoryPL}</p>
                    <p>Status: {statusPL}</p>
                    <p>Data zgłoszenia: {new Date(reportData.created_at).toLocaleDateString()}</p>
                    <div className={classes.reports__entry__content}>
                        <p>Treść zgłoszenia</p>
                        <button onClick={toggle}>{opened ? <IconChevronUp/> : <IconChevronDown/>}</button>
                    </div>
                </div>
                <div>
                    <button className={clsx(classes.reports__entry__delete, reportData.report_status !== 'new' && classes['reports__entry__delete--unavailable'])} disabled={reportData.report_status !== 'new'} onClick={open}><IconTrashX/></button>
                </div>
            </div>
            {opened && (
                <div className={classes.reports__entry__message}>
                    <p>{reportData.message}</p>
                </div>
            )}
            <BottomActionSheet opened={sheetOpen} close={close} withCloseButton={false} size={'35%'}>
                {reportData.report_status !== 'new' && (
                    <div className={classes.reports__sheet}>
                        <h3>Zgłoszenie zostało już przyjęte!</h3>
                        <p>Zgłoszenia przyjęte przez zespół FitExpress nie są możliwe do usunięcia.</p>
                        <p>Jeśli zaszła pomyłka, poinformuj nas o tym w korespondencji mailowej</p>
                        <button onClick={close} className={btnStyles.btn}>Zrozumiano</button>
                    </div>
                )}
                {reportData.report_status === 'new' && <ReportDeleteSheet close={close} reportId={reportData._id} token={token}/>}
            </BottomActionSheet>
        </Card>
    )
}