import {createStore, Store} from "vuex";
import {
    CLEAR_TRACKLIST,
    COPY_TO_CLIPBOARD,
    PARSE_TRACKLIST,
    PRINT_OUTPUT,
    SET_INCLUDE_ARTIST_NAME
} from "./tracklist.actions";
import {type TracklistStoreState} from "./tracklist.state";
import {type InjectionKey} from "vue";
import {cueParserService, printTracklist} from "../service";
import {isEmpty} from "../utils";

export const storeKey: InjectionKey<Store<TracklistStoreState>> = Symbol();

export const store = createStore<TracklistStoreState>({
    strict: import.meta.env.PROD,
    state: {
        output: null,
        tracklist: null,
        includeArtistName: true
    },
    mutations: {
        setTracklist(state, tracklist: Tracklist) {
            state.tracklist = tracklist;
        },
        clearTracklist(state) {
            state.tracklist = null;
            state.output = null;
        },
        setOutput(state, output: string) {
            state.output = output;
        },
        changeIncludeArtistName(state, shouldIncludeArtistName: boolean) {
            state.includeArtistName = shouldIncludeArtistName;
        }
    },
    actions: {
        async [PARSE_TRACKLIST]({commit, state, dispatch}, rawTracklist: string) {
            const tracklist = cueParserService.parse(rawTracklist);
            if (tracklist != null) {
                commit('setTracklist', tracklist);
                await dispatch(PRINT_OUTPUT);
            }
        },
        [CLEAR_TRACKLIST]({commit}) {
            commit('clearTracklist');
        },
        async [SET_INCLUDE_ARTIST_NAME]({dispatch, commit, state}, includeArtistName: boolean) {
            commit('changeIncludeArtistName', includeArtistName);
            const tracklist = state.tracklist;
            if (tracklist != null) {
                await dispatch(PRINT_OUTPUT);
            }
        },
        [PRINT_OUTPUT]({commit, state}) {
            if (state.tracklist != null) {
                const output = printTracklist(state.tracklist, {
                    includeArtistName: state.includeArtistName
                });
                commit('setOutput', output);
            }
        },
        async [COPY_TO_CLIPBOARD]({state}) {
            if (!isEmpty(state.output)) {
                try {
                    await navigator.clipboard.writeText(state.output);
                    console.log('Copied!');
                } catch (error: Error) {
                    console.error(error.message);
                }
            }
        }
    },
    getters: {}
});

