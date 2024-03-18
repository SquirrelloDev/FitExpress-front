import {queryClient} from "../../utils/api";
import {TailSpin} from "react-loader-spinner";
import btnStyles from '../../sass/components/button.module.scss'
import clsx from "clsx";
import classes from "../../sass/components/entry-sheet.module.scss";
import {toast} from "react-hot-toast";
import useReportDelete from "../../queries/reports/delete";

interface ReportDeleteSheetProps {
	close: () => void,
	reportId: string
	token: string
}
function ReportDeleteSheet({close, reportId, token}:ReportDeleteSheetProps) {
	const {mutate, isLoading} = useReportDelete(() => {
		toast.success('Zgłoszenie pomyślnie usunięte!')
		queryClient.invalidateQueries(['UserReports'])
		close()
	})
	const deleteEntry = () => {
		mutate({
			id: reportId,
			token
		})
	}
	return (
		<div className={classes.delete}>
			<h3>Czy na pewno usunąć zgłoszenie?</h3>
			<div className={classes.delete__buttons}>
			<button onClick={deleteEntry} className={clsx(btnStyles.btn, btnStyles['btn--danger'])}>{isLoading ? <TailSpin width={20} height={20}/> : 'Usuń'}</button>
			<button onClick={close} disabled={isLoading} className={clsx(btnStyles.btn, btnStyles['btn--outline'])}>Anuluj</button>
			</div>
		</div>
	)
}
export default ReportDeleteSheet