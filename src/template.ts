import {create} from "handlebars";
import {Tracklist} from "./tracklist.ts";
import debounce from "lodash.debounce";

const handleEnv = create();
const mainTemplate = handleEnv.compile("{{#each tracks}}{{> trackTemplate}}\n{{/each}}");

export function setupTemplateInput(input: HTMLInputElement) {
    input.addEventListener('input', debounce((ev) => {
        if (ev.data != null) {
            handleEnv.registerPartial("trackTemplate", ev.data);
        }
    }, 250));

    handleEnv.registerPartial("trackTemplate", input.value);
}

export function transformTracklist(tracklist: Tracklist): string {
    return mainTemplate(tracklist);
}