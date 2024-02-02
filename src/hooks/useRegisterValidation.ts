import {useMemo} from "react";
import {z} from "zod";
function useRegisterValidation(value: string) {
    const lengthValidator = z.string().min(8);
    const digitValidator = z.string().regex(/[0-9]+/)
    const specialCharacterValidator = z.string().regex(/[@$!%*#?&]+/)
    const validatePasswdRes= useMemo(() => {
        const lengthResult = lengthValidator.safeParse(value).success
        const digitResult =  digitValidator.safeParse(value).success
        const specialCharacterResult = specialCharacterValidator.safeParse(value).success
        return {length: lengthResult, digit: digitResult, specialCharacter: specialCharacterResult}

    }, [digitValidator, lengthValidator, specialCharacterValidator, value])
    return validatePasswdRes
}
export default useRegisterValidation