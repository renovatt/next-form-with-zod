import { CheckboxProps } from '@/@types'
import { useFormContext } from 'react-hook-form';

const Checkbox = ({ ...props }: CheckboxProps) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <input type="checkbox" {...register(props.name)} />
            <label htmlFor="">{props.label}</label>
            {errors?.[props.name] && (
                <p className='text-red-600'>{String(errors?.[props.name]?.message)}</p>)}
        </>
    )
}

export default Checkbox;