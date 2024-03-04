import classes from "../../../sass/components/deleteModalView.module.scss";
import {IconX} from "@tabler/icons-react";
import clsx from "clsx";
import btnStyles from "../../../sass/components/button.module.scss";
import alertStyles from '../../../sass/components/alert.module.scss'
import {FormProvider, useForm} from "react-hook-form";
import Input from "../../Input/Input";
import usePasswdChangeRequest, {
	PasswdPostData,
	RequestPasswdSchema,
	requestSchema
} from "../../../queries/auth/passwdChange";
import {zodResolver} from "@hookform/resolvers/zod";
import {Alert} from "@mantine/core";
interface RequestViewProps {
	closeModal: () => void
}
function RequestView({closeModal}:RequestViewProps) {
	const {mutate, isLoading, isError, error, isSuccess} = usePasswdChangeRequest()
	const methods = useForm({
		resolver: zodResolver(requestSchema),
		mode: 'onTouched'
	})
	const {handleSubmit} = methods
	const onSubmit = (data: RequestPasswdSchema) => {
		const obj: PasswdPostData = {
			email: data.email
		}
		mutate(obj)
	}
	return (
		<FormProvider {...methods}>
		<div className={classes.view}>
			<div className={classes.view__title}>
				<h2>Odzyskaj hasło</h2>
				<button onClick={() => closeModal()}><IconX /></button>
			</div>
			<div>
				{isSuccess &&
				<Alert variant={'light'} title={'Wysłano link'} color={'green'} classNames={{root: alertStyles.alert,title: alertStyles.alert__title,message: alertStyles.alert__message}}>
					Na podany adres e-mail został wysłany link do zmiany hasła
				</Alert>
				}
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.view__info}>
				<p>Podaj adres e-mail do konta FitExpress</p>
				<Input name={'email'} type={'email'}/>
			</div>
			<div className={classes.view__buttons}>
				<button type={'submit'} disabled={isLoading} className={btnStyles.btn}>Wyślij</button>
				<button disabled={isLoading} className={clsx(btnStyles.btn, btnStyles['btn--outline'])} onClick={() => closeModal()}>Anuluj</button>
			</div>
			</form>
		</div>
		</FormProvider>
	)
}
export default RequestView