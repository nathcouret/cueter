interface AbstractTrack {
    file: string;
    performer: string;
    title: string;
}

export interface Tracklist extends AbstractTrack {
    date: string;
    recordedBy: string;
    tracks: Track[];
    exceedHour: boolean;
}

export interface Track extends AbstractTrack{
    index: string;
    timestamp: string;
}