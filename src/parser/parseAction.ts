import {parseCueText} from "./cueParser.ts";
import {transformTracklist} from "../template.ts";

export function doParse() {
    const input = document.querySelector<HTMLTextAreaElement>('#parse-input')!;
    const inputText = input.value.trim();
    if (inputText.length > 0) {
        const result = parseCueText(inputText);
        const transformed = transformTracklist(result);
        console.log(transformed);
        const resultElement = document.querySelector<HTMLTextAreaElement>('#parse-result')!;
        resultElement.value = transformed;
    }
}

export function setupParse(element: HTMLFormElement) {
    element.addEventListener('submit', (evt) => {
        evt.preventDefault();
        doParse();
    });
}