import React from 'react'
import { SelectProps } from '@/@types';
import { useFormContext } from 'react-hook-form';
import Label from './Label';

const Select = ({ ...props }: SelectProps) => {
    const { register } = useFormContext();

    return (
        <>
            <Label htmlFor={props.name}>{props.label}</Label>
            <select {...register(props.name)}
                className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'>
                <option value="">Eschola</option>
                {props.options.length && props.options.map((option: string, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </>
    )
}

export default Select;