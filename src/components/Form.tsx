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
import UserData from "./UserData";
import TechList from "./TechList";
import { Field } from "./Field";
import { ErrorMessage } from "./ErrorMessage";
import InputPhoneMask from "./InputPhoneMask";
import { Insert } from "@/connections";

const defaultData: SchemaTypeProps = {
    password: "",
    confirmPassword: "",
    agree: false,
    select: "",
    quantity: 0,
    role: "",
    url: "",
    email: "",
    username: "",
    techs: [],
    avatar: null,
    date: "",
    phone: "",
    cpf: ""
};

export default function Form() {
    const [data, setData] = useState<SchemaTypeProps>(defaultData)
    const [loading, setLoading] = useState(false)

    const methods = useForm<SchemaTypeProps>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(zodSchema)
    });

    const onSubmit = async (data: SchemaTypeProps) => {
        const file = data.avatar;

        setLoading(true);

        try {
            if (file && file!.size > 0) {
                const result = await Insert(file, data.username)

                if (result instanceof Error) {
                    alert(`${result.name} - ${result.message}`)
                }
            }
            setData(data)
            console.log('Salvo com sucesso.')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
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
                            label='Quantidade'
                            type='number'
                            placeholder='Informe uma quantidade qualquer'
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
                            name='cpf'
                            label='CPF'
                            type='text'
                            placeholder='Informe o seu CPF'
                        />
                        <ErrorMessage field="cpf" />
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
                        <InputPhoneMask
                            name='phone'
                            label='Contato'
                            type='text'
                            placeholder='(99) 9999-9999'
                        />
                        <ErrorMessage field="phone" />
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

                {loading ? (<p className="flex flex-col w-full rounded border p-2">Carregando..</p>) :
                    (<UserData {...data} />)
                }
            </section>
        </FormProvider>
    );
}
