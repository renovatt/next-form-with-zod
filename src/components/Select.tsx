import React from 'react'
import { SelectProps } from '@/@types';
import { useFormContext } from 'react-hook-form';

const Select = ({ ...props }: SelectProps) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <label htmlFor="">{props.label}</label>
            <select {...register(props.name)}
                className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'>
                <option value="">Eschola</option>
                {props.options.length && props.options.map((option: string, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            {errors?.[props.name] && (
                <p className='text-red-600'>{String(errors?.[props.name]?.message)}</p>)}
        </>
    )
}

export default Select;