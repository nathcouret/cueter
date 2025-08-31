interface RekordboxCollection {

}

interface DjPlaylists {
    version: string;
    product: Product;
    collection: Collection;
    playlists: Playlists;
}

interface Product {
    name: string;
    version: string;
    company: string;
    collection: Collection;
}

interface Collection {
    entries: number;
    tracks: Track[];
}

interface Track {
    trackid: number;
    name: string;
    artist: string;
    composer: string;
    album: string;
    grouping: string;
    genre: string;
    kind: string;
    size: number;
    totalTime: number;
    discNumber: number;
    trackNumber: number;
    year: number;
    averageBpm: number;
    dateAdded: string;
    bitRate: number;
    sampleRate: number;
    comments: string;
    playCount: number;
    rating: number;
    location: string;
    remixer: string;
    tonality: string;
    label: string;
    mix: string;
    tempos: Tempo[];
    positionMarks: PositionMark[];
}

interface Tempo {
    inizio: number;
    bpm: number;
    metro: string
    battito: number;
}

interface PositionMark {
    name: string;
    type: number;
    start: number;
    num: number;
    red?: number;
    green?: number;
    blue?: number;
}

interface Playlists {
    nodes: Node[];
}

interface Node {
    type: number;
    name: string;
    count: number;
    nodes: Node[];
    tracks: NodeTrack[];
}

interface NodeTrack {
    key: number;
}

