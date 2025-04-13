export {default as ToggleButton} from "./ToggleButton.vue";

export interface ToggleButtonProps {
    id: string;
    initChecked?: boolean;
}

export interface ToggleButtonEvent {
    value: boolean;
}