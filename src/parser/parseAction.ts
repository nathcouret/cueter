import {parseCueText} from "./cueParser.ts";

export function doParse() {
    const input = document.querySelector<HTMLTextAreaElement>('#parse-input')!;
    const inputText = input.value.trim();
    console.log(inputText);
    if (inputText.length > 0) {
        const result = parseCueText(inputText);
        const resultElement = document.querySelector('#parse-result')!;
        resultElement.innerHTML = JSON.stringify(result);
    }
}

export function parseSetup(element: HTMLButtonElement) {
    element.addEventListener('click', () => doParse());
}

export function clearInput(element: HTMLButtonElement) {
    element.addEventListener('click', () => {
        const input = document.querySelector<HTMLTextAreaElement>('#parse-input')!;
        input.value = '';
        const resultElement = document.querySelector('#parse-result')!;
        resultElement.innerHTML = '';
    });
}