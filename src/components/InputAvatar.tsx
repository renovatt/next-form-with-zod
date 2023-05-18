import { InputProps } from '@/@types'
import { useFormContext } from "react-hook-form";
import Label from './Label';

const InputAvatar = ({ ...props }: InputProps) => {
    const { register, formState: { errors } } = useFormContext();
    const techErrors = errors.techs as Record<number, Record<string, { message: string }>>;

    return (
        <>
            <Label htmlFor={props.name}>{props.label}</Label>
            <input
                {...register(props.name)}
                className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
                type={props.type}
                accept='image/*'
                placeholder={props.placeholder}
            />
            {errors?.[props.name] && (
                <p className='text-xs text-red-500 mt-1'>{String(errors?.[props.name]?.message)}</p>)
            }

            {props.index !== undefined && techErrors?.[props.index] && (
                <p className='text-xs text-red-500 mt-1'>{techErrors[props.index][String(props.title)]?.message}</p>
            )}
        </>
    )
}

export default InputAvatar;