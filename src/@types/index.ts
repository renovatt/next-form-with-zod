import { z } from "zod";
import { zodSchema } from "@/zod";

export type SchemaTypeProps = z.infer<typeof zodSchema>

export type InputProps = {
    name: string;
    label: string;
    type: string;
    placeholder: string;
}

export type SelectProps = {
    name: string;
    label: string;
    options: string[];
};

export type CheckboxProps = {
    name: string;
    label: string;
}

export type AvatarImageProps = {
    name: string;
    url: string;
}