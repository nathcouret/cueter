export {default as TextInput} from "./TextInput.vue";

export interface TextInputProps {
    id: string,
    title: string,
    value: string
    readonly?: boolean,
    placeholder?: string
}

export interface TextInputValueChange {
    value: string;
}