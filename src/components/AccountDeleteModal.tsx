import clsx from "clsx";
import btnStyles from "../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
interface AccountDeleteProps {
	closeModal: () => void,
	deleteMutation: () => void,
	isDeleting:boolean
}
export default function AccountDeleteModal({closeModal, deleteMutation, isDeleting}:AccountDeleteProps) {
	return (
		<div>
			<h2>Roztajesz się z nami?</h2>
			<p>Wszystkie dane konta zostaną usunięte. Utracisz dostęp do korzystania z aplikacji</p>
			<p>Otrzymasz zwrot pieniędzy na konto bankowe w ciągu 3 dni od skasowania konta w przypadku istniejącej aktywnej diety.</p>
			<button onClick={deleteMutation} disabled={isDeleting} className={clsx(btnStyles.btn, btnStyles['btn--outline'], btnStyles['btn--outline--danger'])}>{isDeleting ? <TailSpin/> : 'Usuń konto pernamentnie'}</button>
			<button onClick={closeModal} disabled={isDeleting} className={btnStyles.btn}>Anuluj</button>
		</div>
	)
}