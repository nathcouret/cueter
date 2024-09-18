import {setupParse} from "./parser/parseAction.ts";
import {setupTemplateInput} from "./template.ts";

setupParse(document.querySelector<HTMLFormElement>('#parse-form')!);
setupTemplateInput(document.querySelector<HTMLInputElement>('#template')!);



