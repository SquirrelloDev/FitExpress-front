import {IconX} from "@tabler/icons-react";
import classes from "../../../sass/components/deleteModalView.module.scss";
import btnStyles from '../../../sass/components/button.module.scss'
import {Dispatch, SetStateAction} from "react";
import {ModalType} from "../../../types/table/modalType";
import clsx from "clsx";

interface ViewDeleteProps {
	closeModal: Dispatch<SetStateAction<boolean>>
	deleteMutation: () => void
}
function ViewDelete({closeModal, deleteMutation}:ViewDeleteProps) {
	const deleteFn = () => {
		deleteMutation()
	}
	return (
		<div className={classes.view}>
			<div className={classes.view__title}>
				<h2>Zrezygnować z diety?</h2>
				<button onClick={() => closeModal(false)}><IconX /></button>
			</div>
			<div className={classes.view__info}>
				<p>Czy aby na pewno chcesz zrezygnować z diety? Po zatwierdzeniu tej decyzji nie da się cofnąć!</p>
				<p>Otrzymasz zwrot pieniędzy na konto bankowe w ciągu 3 dni od rezygnacji z planu.</p>
			</div>
				<div className={classes.view__buttons}>
					<button className={clsx(btnStyles.btn,btnStyles['btn--outline'], btnStyles['btn--outline--danger'])} onClick={deleteFn}>Zrezygnuj</button>
					<button className={clsx(btnStyles.btn)} onClick={() => closeModal(false)}>Anuluj</button>
				</div>
		</div>
	)
}
export default ViewDelete