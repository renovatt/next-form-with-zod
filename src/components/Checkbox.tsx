import { CheckboxProps } from '@/@types'
import { useFormContext } from 'react-hook-form';
import Label from './Label';

const Checkbox = ({ ...props }: CheckboxProps) => {
    const { register } = useFormContext();

    return (
        <div className='flex items-center'>
            <input
                className='m-2'
                type="checkbox" {...register(props.name)} />
            <Label htmlFor={props.name}>{props.label}</Label>
        </div>
    )
}

export default Checkbox;