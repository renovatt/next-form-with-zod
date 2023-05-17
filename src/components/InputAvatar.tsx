import { InputProps } from '@/@types'
import { useFormContext } from "react-hook-form";

const InputAvatar = ({ ...props }: InputProps) => {
    const { register, formState: { errors } } = useFormContext();
    const techErrors = errors.techs as Record<number, Record<string, { message: string }>>;

    return (
        <>
            <label htmlFor="">{props.label}</label>
            <input
                {...register(props.name)}
                className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
                type={props.type}
                accept='image/*'
                placeholder={props.placeholder}
            />
            {errors?.[props.name] && (
                <p className='text-red-600'>{String(errors?.[props.name]?.message)}</p>)
            }

            {props.index !== undefined && techErrors?.[props.index] && (
                <p className='text-red-600'>{techErrors[props.index][String(props.title)]?.message}</p>
            )}
        </>
    )
}

export default InputAvatar;