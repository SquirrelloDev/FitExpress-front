import useLoginMutation, {LoginFormDataSchema, LoginFormSchema} from "../queries/auth/login";
import useSuccessfulLogin from "../hooks/useSuccessfulLogin";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "../components/Input/Input";
import {TailSpin} from "react-loader-spinner";
import classes from "../sass/pages/login.module.scss";
import btnStyles from '../sass/components/button.module.scss';
import {Link} from "react-router-dom";
import {appRoutes} from "../utils/routes";

function LoginPage() {
	const handleSuccessfulLogin = useSuccessfulLogin(appRoutes.home);
	const methods = useForm({
		mode: 'onTouched',
		resolver: zodResolver(LoginFormSchema)
	})
	const {mutate, isLoading} = useLoginMutation((returnVals) => { handleSuccessfulLogin(returnVals) } )
	const {handleSubmit} = methods
	const onSubmit = (data: LoginFormDataSchema) =>{
		mutate(data);
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.login}>
				<div>
				<h1 className={classes.login__header}>Logowanie</h1>
				<form onSubmit={handleSubmit(onSubmit)} className={classes.login__form}>
					<Input name='email' placeholder='Adres e-mail'/>
					<Input name='password' type='password' placeholder='Hasło'/>
					<button type='submit' disabled={isLoading} className={btnStyles.btn}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Zaloguj"}</button>
				</form>
				</div>
				<p className={classes.login__footer}>Nie masz konta? <Link to={appRoutes.register} className={classes['login__footer-link']}>Stwórz je teraz</Link></p>
			</div>
		</FormProvider>

	)
}
export default LoginPage;