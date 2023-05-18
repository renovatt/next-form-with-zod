import { CheckboxProps } from '@/@types'
import { useFormContext } from 'react-hook-form';
import Label from './Label';

const Checkbox = ({ ...props }: CheckboxProps) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='flex items-center'>
            <input
            className='m-2'
            type="checkbox" {...register(props.name)} />
            <Label htmlFor={props.name}>{props.label}</Label>
            
            {errors?.[props.name] && (
                <p className='ml-2 text-xs text-red-500 mt-1'>{String(errors?.[props.name]?.message)}</p>)}
        </div>
    )
}

export default Checkbox;