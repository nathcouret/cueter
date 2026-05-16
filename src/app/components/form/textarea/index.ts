export {default as TextAreaInput} from "./TextareaInput.vue";

export interface TextAreaProps {
    id: string,
    title: string,
    value: string
    readonly?: boolean,
    rows?: number;
}

export interface TextAreaValueChange {
    value: string;
}