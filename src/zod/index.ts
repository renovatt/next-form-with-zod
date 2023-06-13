import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5mb
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const zodSchema = z.object({
    avatar: z
        .custom<FileList>(files => files instanceof FileList)
        .transform(list => list.item(0))
        .refine((files) => files!.size <= MAX_FILE_SIZE, 'Tamanho máximo de 5MB')
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files!.type), "Formato de imagem inválido"),

    username: z.string().max(44, 'O nome tem muito caracteres').nonempty('Nome é obrigatório'),
    email: z.string().email('Precisa ser um e-mail válido'),
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
    agree: z.boolean(),
    select: z.string(),
    url: z.string().url('Por favor informe uma url válida'),

    date: z.coerce.date({
        errorMap: () => {
            return { message: 'Informe uma data válida' }
        }
    })
        .refine(value => value >= new Date("1900-01-01"), "Você é muito velho"),

    techs: z.array(z.object({
        title: z.string().nonempty('Digite uma tecnologia'),
        knowledge: z.coerce.number().min(1, 'Tem que ter pelo menos nível 1').max(5, 'Nível máximo de 5'),
    })).min(2, 'Insira pelo menos duas tecnologias'),

    quantity: z.number({
        errorMap: () => {
            return { message: 'Informe um número válido' }
        }
    }).positive('O número deve ser positivo'),

    phone: z.string({
        errorMap: () => {
            return { message: 'Informe um número de contato válido' }
        }
    }).nonempty('Número de contato obrigatório'),

    cpf: z.string({
        errorMap: () => {
            return { message: 'Informe um número de CPF válido' }
        }
    }).nonempty('CPF é obrigatório'),

    role: z.enum(['admin', 'user', ''], {
        errorMap: () => {
            return { message: 'Escolha entre admin ou user' }
        }
    })
})
    .refine(fields => fields.password === fields.confirmPassword, {
        path: ['confirmPassword'],
        message: 'A senhas não correspondem'
    })
    .refine(fields => fields.agree === true, {
        path: ['agree'],
        message: 'Precisa aceitar os termos'
    })
    .refine(fields => fields.select.length > 0, {
        path: ['select'],
        message: 'Precisa selecionar uma opção'
    })
    .refine(fields => /^\(\d{2}\) \d{5}-\d{4}$/.test(fields.phone), {
        message: "Número de contato inválido",
        path: ['phone'],
    })
    .refine(fields => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(fields.cpf), {
        message: "O CPF deve estar no formato 123.456.789-01.",
        path: ['cpf'],
    })
    .refine(fields => fields.role.length > 0, {
        path: ['role'],
        message: 'Escolha entre admin ou user'
    })

    .transform(fields => ({
        password: fields.password,
        confirmPassword: fields.confirmPassword,
        agree: fields.agree,
        select: fields.select,
        quantity: fields.quantity,
        role: fields.role,
        url: fields.url.toLocaleLowerCase(),
        email: fields.email.toLocaleLowerCase(),
        username: fields.username.trim().split(' ').map(word => {
            return word[0].toLocaleUpperCase().concat(word.substring(1))
        }).join(' '),
        techs: fields.techs,
        avatar: fields.avatar,
        date: fields.date.toLocaleDateString('pt-br', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
        phone: fields.phone,
        cpf: fields.cpf,
    }))