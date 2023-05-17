'use client'

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { SchemaTypeProps } from '@/@types'
import { zodSchema } from '@/zod'
import Input from "./Input";
import Checkbox from "./Checkbox";
import Select from "./Select";
import { useState } from "react";
import InputNumber from "./InputNumber";
import InputAvatar from "./InputAvatar";
// import supabase from "@/supabase";

export default function Form() {
    const [data, setData] = useState('')

    const methods = useForm<SchemaTypeProps>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(zodSchema)
    });

    const { control, formState: { errors } } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'techs'
    })

    const addNewTech = () => {
        append({ title: '', knowledge: 0 })
    }

    const onSubmit = async (data: SchemaTypeProps) => {

        // const avatarFile = data.avatar;
        // const { data: uploadData, error } = await supabase
        //     .storage
        //     .from('form-zod')
        //     .upload(`avatars/${avatarFile.name}`, avatarFile, {
        //         cacheControl: '3600',
        //         upsert: false
        //     })

        // console.log(uploadData)
        // console.log(error)

        console.log(data)
        setData(JSON.stringify(data, null, 2))
    };

    return (
        <FormProvider {...methods}>
            <section className="flex flex-col">
                <form
                    className="flex flex-col"
                    onSubmit={methods.handleSubmit(onSubmit)}>

                    <InputAvatar
                        name='avatar'
                        label='Avatar'
                        type='file'
                        placeholder='Escolha uma imagem'
                    />

                    <Input
                        name='username'
                        label='Nome'
                        type='text'
                        placeholder='Digine o seu nome'
                    />

                    <Input
                        name='email'
                        label='E-mail'
                        type='email'
                        placeholder='Digine o seu e-mail'
                    />

                    <Input
                        name='password'
                        label='Senha'
                        type='password'
                        placeholder='Informe sua senha'
                    />

                    <Input
                        name='confirmPassword'
                        label='Confirme sua senha'
                        type='password'
                        placeholder='Confirme sua senha'
                    />

                    <InputNumber
                        name='quantity'
                        label='Quantity'
                        type='number'
                        placeholder='Informe seu número'
                    />

                    <Input
                        name='url'
                        label='URL'
                        type='text'
                        placeholder='Informe sua url'
                    />

                    <Input
                        name='role'
                        label='Permissão'
                        type='text'
                        placeholder='Informa sua permissão'
                    />

                    <Input
                        name='date'
                        label='Data de Nascimento'
                        type='date'
                        placeholder='06/12/2023'
                    />

                    <Select
                        name='select'
                        label='Selecione uma opção'
                        options={['Masculino', 'Feminino']}
                    />

                    <Checkbox
                        name='agree'
                        label='Aceitar os termos'
                    />

                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Tecnolgias
                            <button onClick={addNewTech} type="button" className="text-cyan-500">
                                Adicionar
                            </button>
                        </label>

                        {fields.map((field, index) => {
                            return (
                                <div key={field.id} className="flex gap-2">
                                    <Input
                                        name={`techs.${index}.title`}
                                        label='Titulo'
                                        type='text'
                                        placeholder='Informa sua permissão'
                                        index={index}
                                        title='title'
                                    />

                                    <Input
                                        name={`techs.${index}.knowledge`}
                                        label='Nível'
                                        type='number'
                                        placeholder='Informa sua permissão'
                                        index={index}
                                        title='knowledge'
                                    />

                                    <button type="button" onClick={() => remove(index)}>Del</button>
                                </div>
                            )
                        })}
                        {errors.techs && (<p className='text-red-600'>{errors.techs.message}</p>)}
                    </div>

                    <input className="cursor-pointer" type='submit' />
                </form>

                <div className="flex flex-col">
                    {data && (<pre>{data}</pre>)}
                </div>
            </section>
        </FormProvider>
    );
}
