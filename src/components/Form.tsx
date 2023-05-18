'use client'

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { SchemaTypeProps } from '@/@types'
import { zodSchema } from '@/zod'
import Input from "./Input";
import Checkbox from "./Checkbox";
import Select from "./Select";
import { useState } from "react";
import InputNumber from "./InputNumber";
import InputAvatar from "./InputAvatar";
import JsonData from "./JsonData";
import TechList from "./TechList";
import { Field } from "./Field";
import { ErrorMessage } from "./ErrorMessage";
// import supabase from "@/supabase";

export default function Form() {
    const [data, setData] = useState('')

    const methods = useForm<SchemaTypeProps>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(zodSchema)
    });

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
        setData(JSON.stringify(data, null, 2))
    };

    return (
        <FormProvider {...methods}>
            <section className="flex flex-col gap-4 w-full max-w-xs">
                <form
                    className="flex flex-col gap-4 w-full max-w-xs"
                    onSubmit={methods.handleSubmit(onSubmit)}>

                    <Field>
                        <InputAvatar
                            name='avatar'
                            label='Avatar'
                            type='file'
                            placeholder='Escolha uma imagem'
                        />
                        <ErrorMessage field="avatar" />
                    </Field>

                    <Field>
                        <Input
                            name='username'
                            label='Nome'
                            type='text'
                            placeholder='Digine o seu nome'
                        />
                        <ErrorMessage field="username" />
                    </Field>

                    <Field>
                        <Input
                            name='email'
                            label='E-mail'
                            type='email'
                            placeholder='Digine o seu e-mail'
                        />
                        <ErrorMessage field="email" />
                    </Field>

                    <Field>
                        <Input
                            name='password'
                            label='Senha'
                            type='password'
                            placeholder='Informe sua senha'
                        />
                        <ErrorMessage field="password" />
                    </Field>

                    <Field>
                        <Input
                            name='confirmPassword'
                            label='Confirme sua senha'
                            type='password'
                            placeholder='Confirme sua senha'
                        />
                        <ErrorMessage field="confirmPassword" />
                    </Field>

                    <Field>
                        <InputNumber
                            name='quantity'
                            label='Quantity'
                            type='number'
                            placeholder='Informe seu número'
                        />
                        <ErrorMessage field="quantity" />
                    </Field>

                    <Field>
                        <Input
                            name='url'
                            label='URL'
                            type='text'
                            placeholder='Informe sua url'
                        />
                        <ErrorMessage field="url" />
                    </Field>

                    <Field>
                        <Input
                            name='role'
                            label='Permissão'
                            type='text'
                            placeholder='Informa sua permissão'
                        />
                        <ErrorMessage field="role" />
                    </Field>

                    <Field>
                        <Input
                            name='date'
                            label='Data de Nascimento'
                            type='datetime-local'
                            placeholder='06/12/2023'
                        />
                        <ErrorMessage field="date" />
                    </Field>

                    <Field>
                        <Select
                            name='select'
                            label='Sexo'
                            options={['Masculino', 'Feminino']}
                        />
                        <ErrorMessage field="select" />
                    </Field>

                    <Field>
                        <Checkbox
                            name='agree'
                            label='Aceitar os termos'
                        />
                        <ErrorMessage field="agree" />
                    </Field>

                    <Field>
                        <TechList />
                        <ErrorMessage field="techs" />
                    </Field>

                    <input className="bg-violet-500 text-white rounded px-3 h-10 font-semibold text-sm hover:bg-violet-600 cursor-pointer" type='submit' />
                </form>
                <JsonData data={data} />
            </section>
        </FormProvider>
    );
}
