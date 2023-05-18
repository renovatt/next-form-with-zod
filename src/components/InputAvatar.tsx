import { InputProps } from '@/@types'
import { useFormContext } from "react-hook-form";
import Label from './Label';

const InputAvatar = ({ ...props }: InputProps) => {
    const { register } = useFormContext();

    return (
        <>
            <Label htmlFor={props.name}>{props.label}</Label>
            <input
                {...register(props.name)}
                className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
                accept='image/*'
                {...props}
            />
        </>
    )
}

export default InputAvatar;