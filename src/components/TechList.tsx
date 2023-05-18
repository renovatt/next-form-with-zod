import React from 'react'
import Input from './Input'
import Label from './Label';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

const TechList = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'techs'
    })

    const addNewTech = () => append({ title: '', knowledge: 0 })

    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor="techs">Tecnologias</Label>
            <button onClick={addNewTech} type="button" className="text-violet-500 font-semibold text-sm flex items-center gap-1">Adicionar</button>

            {fields.map((field, index) => {
                const titleName = `techs.${index}.title`
                const knowledgeName = `techs.${index}.knowledge`

                return (
                    <div key={field.id} className="flex flex-col gap-1">
                        <Input
                            name={titleName}
                            label='Titulo'
                            type='text'
                            placeholder='Informe uma tecnologia'
                            index={index}
                            title='title'
                        />
                        <ErrorMessage field={titleName} />

                        <Input
                            name={knowledgeName}
                            label='Nível'
                            type='number'
                            placeholder='Nível de conhecimento'
                            index={index}
                            title='knowledge'
                        />
                        <ErrorMessage field={knowledgeName} />

                        <button className="bg-red-500 text-white rounded px-3 h-10 font-semibold text-sm hover:bg-red-600 cursor-pointer" type="button" onClick={() => remove(index)}>Remover</button>
                    </div>
                )
            })}
        </div>
    )
}

export default TechList