import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import {useSearchParams} from "react-router-dom";
import classes from "../../sass/pages/passwd-change.module.scss";
function ChangePasswordPage() {
	const [searchParams] = useSearchParams()
	return (
		<section className={classes.change}>
			<h1 className={classes.change__heading}>Zmiana hasła</h1>
			<ChangePasswordForm token={searchParams.get('token')}/>
		</section>
	)
}
export default ChangePasswordPage