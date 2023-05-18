import { InputProps } from '@/@types'
import { useFormContext } from "react-hook-form";
import Label from './Label';
import InputMask from 'react-input-mask';

const InputPhoneMask = ({ ...props }: InputProps) => {
    const { register } = useFormContext();

    return (
        <>
            <Label htmlFor={props.name}>{props.label}</Label>
            <InputMask
                mask="(99) 99999-9999"
                maskChar={null}
                {...register(props.name)} className='flex-1 rounded border border-zinc-300 shadow-sm px-3 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500'
                {...props}
            />
        </>
    )
}

export default InputPhoneMask;