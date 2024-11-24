import {DateTime} from "luxon";

interface AbstractTrack {
    file: string;
    performer: string;
    title: string;
}

export interface Tracklist extends AbstractTrack {
    date: DateTime;
    recordedBy: string;
    tracks: Track[];
}

export interface Track extends AbstractTrack{
    index: string;
    timestamp: string;
}