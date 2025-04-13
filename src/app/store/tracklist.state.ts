import {type Tracklist} from "../model/tracklist";

export interface TracklistStoreState {
    output: string | null;
    tracklist: Tracklist | null;
    includeArtistName: boolean;
}