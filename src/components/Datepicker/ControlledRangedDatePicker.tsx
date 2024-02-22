import DatePicker, {ReactDatePickerProps, registerLocale} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "../../sass/components/date-picker.scss"
import inputStyles from '../../sass/components/text-input.module.scss'
import {Control, Controller, FieldValues, Path, useFormContext} from 'react-hook-form'
import CustomInput from "./CustomInput";
import errorMessages from "../../utils/errorMessages";
import {useState} from "react";
import pl from "date-fns/locale/pl";

interface ControlledDatepickerProps<T extends FieldValues>
  extends Omit<ReactDatePickerProps, 'onChange'> {
  control: Control<T>
  name: string
  error?: string
}
registerLocale('pl', pl)
function ControlledDatePicker<T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledDatepickerProps<T>) {
  const {
    formState: { errors },
  } = useFormContext()
    const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
    const [startDate, endDate] = dateRange;
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({
        field: { onChange,onBlur, value },
        fieldState: { isTouched },
      }) => (
        <div>
          <DatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            onChange={(date) => {
                setDateRange(date as Date[]);
                onChange(date)
            }}
            dateFormat="dd/MM/yyyy"
            onBlur={onBlur}
            wrapperClassName={'wrapper'}
            customInput={<CustomInput name={name} />}
            nextMonthButtonLabel=">"
            previousMonthButtonLabel="<"
            locale={'pl'}
            {...props}
          />
          {errors[name] && (
            <p className={inputStyles.error}>
              {`${errors[name]?.message}`}
            </p>
          )}
          {!errors[name] && isTouched && !value && (
            <p className={inputStyles.error}>
                {errorMessages.required}
            </p>
          )}
        </div>
      )}
    />
  )
}
export default ControlledDatePicker
