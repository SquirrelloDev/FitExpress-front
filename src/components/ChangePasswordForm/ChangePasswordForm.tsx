import {FormProvider, useForm, useWatch} from "react-hook-form";
import Input from "../Input/Input";
import PasswordValidator from "../PasswordValidator/PasswordValidator";
import {changePasswdSchema, ChangePasswdSchema, NewPasswdData, usePasswdChange} from "../../queries/auth/passwdChange";
import {zodResolver} from "@hookform/resolvers/zod";
import btnStyles from '../../sass/components/button.module.scss'
import classes from "../../sass/pages/passwd-change.module.scss";
import {Alert} from "@mantine/core";
import alertStyles from "../../sass/components/alert.module.scss";

interface ChangePasswordFormProps {
    token: string
}

function ChangePasswordForm({token}: ChangePasswordFormProps) {
    const {mutate, isLoading, isError, error} = usePasswdChange()
    const methods = useForm({
        resolver: zodResolver(changePasswdSchema),
        mode: "onTouched"
    })
    const {handleSubmit, control} = methods
    const passwdVal = useWatch({name: 'newPasswd', control})
    const onSubmit = (data: ChangePasswdSchema) => {
        const passwdObj: NewPasswdData = {
            password: data.newPasswd,
            resetToken: token
        }
        mutate(passwdObj)
    }
    return (
        <FormProvider {...methods}>
                {isError &&
                    <Alert title={'Wystąpił błąd'} variant={'light'} color={'red'} classNames={{root: alertStyles.alert,title: alertStyles.alert__title,message: alertStyles.alert__message}}>
						{error?.message}
                    </Alert>}
            <form className={classes.change__form} onSubmit={handleSubmit(onSubmit)}>
                <Input type={'password'} placeholder={'Nowe hasło'} name={'newPasswd'}/>
                <Input type={'password'} placeholder={'Potwierdź nowe hasło'} name={'newPasswdConfirm'}/>
                <PasswordValidator value={passwdVal}/>
                <button type={'submit'} disabled={isLoading} className={btnStyles.btn}>Zmień hasło</button>
            </form>
        </FormProvider>
    )
}

export default ChangePasswordForm