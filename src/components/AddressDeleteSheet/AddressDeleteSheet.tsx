import {queryClient} from "../../utils/api";
import {TailSpin} from "react-loader-spinner";
import btnStyles from '../../sass/components/button.module.scss'
import clsx from "clsx";
import classes from "../../sass/components/entry-sheet.module.scss";
import useAddressDelete from "../../queries/addresses/delete";
import {toast} from "react-hot-toast";
interface AddressDeleteSheetProps {
	close: () => void,
	addressId: string
	token: string
}
function AddressDeleteSheet({close, addressId, token}:AddressDeleteSheetProps) {
	const {mutate, isLoading} = useAddressDelete(() => {
		toast.success('Adres pomyślnie usunięty!')
		queryClient.invalidateQueries(['AddressesList'])
		close()
	})
	const deleteEntry = () => {
		mutate({
			id: addressId,
			token
		})
	}
	return (
		<div className={classes.delete}>
			<h3>Czy na pewno usunąć adres?</h3>
			<div className={classes.delete__buttons}>
			<button onClick={deleteEntry} className={clsx(btnStyles.btn, btnStyles['btn--danger'])}>{isLoading ? <TailSpin/> : 'Usuń'}</button>
			<button onClick={close} disabled={isLoading} className={clsx(btnStyles.btn, btnStyles['btn--outline'])}>Anuluj</button>
			</div>
		</div>
	)
}
export default AddressDeleteSheet