import useProgressDelete from "../../queries/progress-entry/delete";
import {queryClient} from "../../utils/api";
import {TailSpin} from "react-loader-spinner";
import btnStyles from '../../sass/components/button.module.scss'
import clsx from "clsx";
import classes from "../../sass/components/entry-sheet.module.scss";
interface DeleteSheetProps {
	close: () => void,
	userId: string
	token: string
	date: Date,
	kind: "water" | "weight"
}
function DeleteSheet({close, userId, token, date, kind}:DeleteSheetProps) {
	const {mutate, isLoading} = useProgressDelete(() => {
		queryClient.invalidateQueries(['List-Progress'])
		close()
	})
	const deleteEntry = () => {
		mutate({
			id: userId,
			token: token,
			kind: kind,
			date: date
		})
	}
	return (
		<div className={classes.delete}>
			<h3>Czy na pewno usunąć wpis?</h3>
			<div className={classes.delete__buttons}>
			<button onClick={deleteEntry} className={clsx(btnStyles.btn, btnStyles['btn--danger'])}>{isLoading ? <TailSpin width={20} height={20}/> : 'Usuń'}</button>
			<button onClick={close} disabled={isLoading} className={clsx(btnStyles.btn, btnStyles['btn--outline'])}>Anuluj</button>
			</div>
		</div>
	)
}
export default DeleteSheet