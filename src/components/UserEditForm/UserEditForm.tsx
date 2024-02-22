import {FormProvider, useForm} from "react-hook-form";
import Input from "../Input/Input";
import btnStyles from '../../sass/components/button.module.scss'
import useUserEdit, {UserPutData, userPutSchema, UserPutSchema} from "../../queries/user/edit";
import {TailSpin} from "react-loader-spinner";
import {zodResolver} from "@hookform/resolvers/zod";
import classes from "../../sass/pages/profile-details.module.scss";
interface UserEditFormProps {
	name: string,
	phone: string,
	email: string,
	id: string,
	token: string
}
export default function UserEditForm({name, phone, email, id, token}:UserEditFormProps) {
	const {mutate, isLoading} = useUserEdit()
	const methods = useForm({
		defaultValues: {
			name, phone, email
		},
		resolver: zodResolver(userPutSchema),
		mode: "onTouched"
	})
	const {handleSubmit} = methods
	const onSubmit = (data: UserPutSchema) => {
		const putData: UserPutData = {
			user: {
				name: data.name,
				phone: data.phone,
				email: data.email
			},
			authInfo:{
				token, id
			}
		}
		mutate(putData)
	}
	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className={classes.details__form}>
				<Input name={'name'} placeholder={'Imię i nazwisko'}/>
				<Input type={"tel"} name={'phone'} placeholder={'Numer telefonu'}/>
				<Input type={"email"} name={'email'} placeholder={'Adres e-mail'}/>
				<button type={'submit'} className={btnStyles.btn} disabled={isLoading}>{isLoading ? <TailSpin /> : 'Aktualizuj'}</button>
			</form>
		</FormProvider>
	)
}