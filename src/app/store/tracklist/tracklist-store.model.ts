import {Tracklist} from "../model/tracklist";

export interface TracklistStoreState {
    template: string;
    output: string | null;
    tracklist: Tracklist | null;
}

export enum TracklistActions {
    PARSE_TRACKLIST = "parseTracklist",
    CLEAR_TRACKLIST = "clearTracklist",
    CHANGE_TEMPLATE = "changeTemplate"
}