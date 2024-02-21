import useProgressDelete from "../../../queries/progress-entry/delete";
import {queryClient} from "../../../utils/api";
import {TailSpin} from "react-loader-spinner";
import btnStyles from '../../../sass/components/button.module.scss'
import clsx from "clsx";
interface WaterDeleteSheetProps {
	close: () => void,
	userId: string
	token: string
	date: Date
}
function WaterDeleteSheet({close, userId, token, date}:WaterDeleteSheetProps) {
	const {mutate, isLoading, error} = useProgressDelete(() => {
		queryClient.invalidateQueries(['List-Progress'])
		close()
	})
	const deleteEntry = () => {
		mutate({
			id: userId,
			token: token,
			kind: "water",
			date: date
		})
	}
	return (
		<div>
			<h3>Czy na pewno usunąć wpis?</h3>
			<button onClick={deleteEntry} className={clsx(btnStyles.btn, btnStyles['btn--danger'])}>{isLoading ? <TailSpin/> : 'Usuń'}</button>
			<button onClick={close} disabled={isLoading} className={clsx(btnStyles.btn, btnStyles['btn--outline'])}>Anuluj</button>
		</div>
	)
}
export default WaterDeleteSheet