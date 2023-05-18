import { InputProps } from '@/@types'
import { useFormContext } from "react-hook-form";
import Label from './Label';

const InputNumber = ({ ...props }: InputProps) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <Label htmlFor={props.name}>{props.label}</Label>
            <input
                {...register(props.name, {
                    setValueAs: (value: string) => parseInt(value, 10)
                })}
                className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
                type={props.type}
                placeholder={props.placeholder}
            />
            {errors?.[props.name] && (
                <p className='text-xs text-red-500 mt-1'>{String(errors?.[props.name]?.message)}</p>)}
        </>
    )
}

export default InputNumber;