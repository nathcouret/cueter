import {parseCueText} from "./cueParser.ts";
import {transformTracklist} from "../template/template.ts";

export function doParse(inputText: string): string {
    if (inputText.length > 0) {
        const result = parseCueText(inputText);
        return transformTracklist(result);
    }
    return '';
}

export function setupParse(element: HTMLFormElement) {
    element.addEventListener('submit', (evt) => {
        evt.preventDefault();
        doParse();
    });
}