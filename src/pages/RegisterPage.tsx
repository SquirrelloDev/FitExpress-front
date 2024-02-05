import useSuccessfulLogin from "../hooks/useSuccessfulLogin";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import classes from "../sass/pages/login.module.scss";
import Input from "../components/Input/Input";
import btnStyles from "../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import {Link} from "react-router-dom";
import {appRoutes} from "../utils/routes";
import PasswordValidator from "../components/PasswordValidator/PasswordValidator";
import useRegisterMutation, {RegisterFormDataSchema, RegisterFormSchema} from "../queries/auth/register";

function RegisterPage() {
	const handleSuccessfulLogin = useSuccessfulLogin(appRoutes.healthCard);
	const methods = useForm({
		mode: 'onTouched',
		resolver: zodResolver(RegisterFormSchema)
	})
	const {mutate, isLoading} = useRegisterMutation((returnVals) => { handleSuccessfulLogin(returnVals) } )
	const {handleSubmit, watch} = methods
	const passwdValue = watch('password');
	const onSubmit = (data: RegisterFormDataSchema) =>{
		mutate(data);
	}
	return (
		<FormProvider {...methods}>
			<div className={classes.login}>
				<div>
					<h1 className={classes.login__header}>Rejestracja</h1>
					{/*@ts-expect-error data are sent correctly*/}
					<form onSubmit={handleSubmit(onSubmit)} className={classes.login__form}>
						<Input name='name' placeholder='Imię i nazwisko:'/>
						<Input name='email' type='email' placeholder='Adres e-mail:'/>
						<Input name='phone' type='tel' placeholder='Numer telefonu (+48):'/>
						<Input name='password' type='password' placeholder='Hasło:'/>
						<PasswordValidator value={passwdValue}/>
						<button type='submit' disabled={isLoading} className={btnStyles.btn}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20}/> : "Utwórz konto"}</button>
					</form>
				</div>
				<p className={classes.login__footer}>Masz już konto? <Link to={appRoutes.login} className={classes['login__footer-link']}>Zaloguj się</Link></p>
			</div>
		</FormProvider>

	)
}
export default RegisterPage;