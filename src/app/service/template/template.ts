import {create} from "handlebars";
import {Tracklist} from "../../model/tracklist.ts";

const handleEnv = create();
const mainTemplate = handleEnv.compile("{{#each tracks}}{{> trackTemplate}}\n{{/each}}");

export function transformTracklist(tracklist: Tracklist): string {
    return mainTemplate(tracklist);
}