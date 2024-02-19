import {IconX} from "@tabler/icons-react";
import classes from "../../../sass/components/deleteModalView.module.scss";
import {Dispatch, SetStateAction} from "react";
import {ModalType} from "../../../types/table/modalType";

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
				<h1>Zrezygnować z diety?</h1>
				<button onClick={() => closeModal(false)}><IconX /></button>
			</div>
			<div className={classes.view__info}>
				<p>Czy aby na pewno chcesz zrezygnować z diety? Po zatwierdzeniu tej decyzji nie da się cofnąć!</p>
				<p>Otrzymasz zwrot pieniędzy na konto bankowe w ciągu 3 dni od rezygnacji z planu.</p>
			</div>
				<div className={classes.view__buttons}>
					<button onClick={deleteFn}>Zrezygnuj</button>
					<button onClick={() => closeModal(false)}>Anuluj</button>
				</div>
		</div>
	)
}
export default ViewDelete