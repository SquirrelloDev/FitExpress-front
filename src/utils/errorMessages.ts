import {z} from "zod";

const errorMessages = {
    required: 'Wymagane',
    invalidMail: 'To nie wygląda jak adres email',
    shortPasswd: (len: number) => `Hasło musi mieć conajmniej ${len} znaków`,
    minMax: (minVal: number, maxVal = 100) => `Wartość powinna być w zakresie ${minVal} - ${maxVal}`
}
export const selectErrorMap: z.ZodErrorMap = (error) => {
    if (error.code === z.ZodIssueCode.invalid_type) {
        return { message: errorMessages.required }
    }
    return {message: ""}
}
export const dateErrorMap: z.ZodErrorMap = (error) => {
    if (error.code === z.ZodIssueCode.invalid_date) {
        return {message: errorMessages.required}
    }
    return {message: ""}
}
export default errorMessages