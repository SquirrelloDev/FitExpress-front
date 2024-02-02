import classes from "../../sass/components/password-validator.module.scss";
import {IconCheck} from "@tabler/icons-react";
import clsx from "clsx";
import useRegisterValidation from "../../hooks/useRegisterValidation";

interface PasswordValidatorProps {
    value: string
}

function PasswordValidator({value}: PasswordValidatorProps) {
    const validatePasswdRes = useRegisterValidation(value);

    return (
        <div className={classes.validator}>
            <div className={classes.validator__tips}>
                <p className={classes.validator__tips__text}>Hasło musi składać z:</p>
                <ul className={classes.validator__tips__list}>
                    <li className={clsx(classes.validator__tips__list__item, validatePasswdRes.length && classes['validator__tips__list__item--correct'])}>
                        <IconCheck/> Co najmniej 8 znaków
                    </li>
                    <li className={clsx(classes.validator__tips__list__item, validatePasswdRes.specialCharacter && classes['validator__tips__list__item--correct'])}>
                        <IconCheck/> Znaku specjalnego
                    </li>
                    <li className={clsx(classes.validator__tips__list__item, validatePasswdRes.digit && classes['validator__tips__list__item--correct'])}>
                        <IconCheck/> Co najmniej 1. cyfry
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PasswordValidator