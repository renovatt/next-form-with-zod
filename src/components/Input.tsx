import { InputProps } from '@/@types'
import { useFormContext } from "react-hook-form";
import Label from './Label';

const Input = ({ ...props }: InputProps) => {
    const { register, formState: { errors } } = useFormContext();
    const techErrors = errors.techs as Record<number, Record<string, { message: string }>>;

    return (
        <>
            <Label htmlFor={props.name}>{props.label}</Label>
            <input
                {...register(props.name)}
                className='flex-1 rounded border border-zinc-300 shadow-sm px-3 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500'
                type={props.type}
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

export default Input;