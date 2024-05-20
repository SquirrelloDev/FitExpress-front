import inputStyles from '../../sass/components/text-input.module.scss'
import { forwardRef, useId } from 'react'
import { useFormContext } from 'react-hook-form'
import { InputProps } from '../Input/types'

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      placeholder,
      type,
      name,
      ...props
    },
    ref
  ) => {
    const id = useId()
    const {
      register,
      formState: { errors },
    } = useFormContext()
    return (
      <div className={inputStyles.input__wrapper}>
          <label
              htmlFor={id}
              className={inputStyles.input__label}
          >
              {placeholder}
          </label>
        <input
          id={id}
          placeholder=" "
          type={type}
          className={className ? className : inputStyles.input}
          //@ts-expect-error the ref should be overwritten by the hook form lib
          ref={ref}
          {...register(`${name}`)}
          {...props}
        />
        {errors[name!] && (
          <p>
            {`${errors[name!]?.message}`}
          </p>
        )}
      </div>
    )
  }
)

CustomInput.displayName = 'CustomInput'

export default CustomInput
