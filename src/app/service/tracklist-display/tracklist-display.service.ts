import {create} from "handlebars";
import {Tracklist} from "../../model/tracklist";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TracklistDisplayService {

    public static readonly DEFAULT_TRACK_TEMPLATE = "{{{timestamp}}} {{{performer}}} - {{{title}}}";

    private readonly handleEnv = create();
    private mainTemplate = this.handleEnv.compile(`{{#each tracks}}${TracklistDisplayService.DEFAULT_TRACK_TEMPLATE}\n{{/each}}`);
    private currentTemplate = TracklistDisplayService.DEFAULT_TRACK_TEMPLATE;

    public transformTracklist(tracklist: Tracklist, template?: string): string {
        if (template !== undefined && template !== this.currentTemplate) {
            this.updateTrackTemplate(template);
        }
        return this.mainTemplate(tracklist);
    }


    public updateTrackTemplate(template: string) {
        this.mainTemplate = this.handleEnv.compile(`{{#each tracks}}{{> ${template}}\n{{/each}}`);
    }

    public resetTrackTemplate() {
        this.updateTrackTemplate(TracklistDisplayService.DEFAULT_TRACK_TEMPLATE);
    }

}