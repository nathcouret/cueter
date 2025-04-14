import {type Tracklist} from "../model/tracklist";

export interface PrintContext {
    includeArtistName: boolean;
}

export function printTracklist(tracklist: Tracklist, context: PrintContext): string {
    const tracks = tracklist.tracks.map(({timestamp, title, performer}) => {
        let time = timestamp;
        if (!tracklist.exceedHour) {
            time = timestamp.substring(3);
        }
        if (context.includeArtistName) {
            return `${time} ${performer} - ${title}`;
        }
        return `${time} ${title}`;
    });
    return tracks.join('\n');
}