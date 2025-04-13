import {type Tracklist} from "../model/tracklist";

export interface PrintContext {
    includeArtistName: boolean;
}

export function printTracklist(tracklist: Tracklist, context: PrintContext): string {
    const tracks = tracklist.tracks.map(({timestamp, title, performer}) => {
        if (context.includeArtistName) {
            return `${timestamp} ${performer} - ${title}`;
        }
        return `${timestamp} ${title}`;
    });
    return tracks.join('\n');
};