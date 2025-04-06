import {createStore} from "vuex";
import {tracklistStore} from "./tracklist";

export const store = createStore<TracklistStore>({
    strict: true,
    modules: {
        tracklistStore
    }
})