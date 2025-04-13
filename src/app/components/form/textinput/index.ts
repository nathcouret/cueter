export {default as TextInput} from "./TextInput.vue";

export interface TextInputProps {
    id: string,
    title: string,
    value: string
    readonly?: boolean
}

export interface TextInputValueChange {
    value: string;
}