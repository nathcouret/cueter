import {cueParserService, TracklistDisplayService, tracklistDisplayService} from "../../service";
import {Tracklist} from "../../model/tracklist";
import {CHANGE_TEMPLATE, CLEAR_TRACKLIST, SET_OUTPUT, SET_TRACKLIST} from "./tracklist.mutations";
import {PARSE_TRACKLIST} from "./tracklist.actions";

export const tracklistStore = {
    state: {
        template: TracklistDisplayService.DEFAULT_TRACK_TEMPLATE,
        output: null,
        tracklist: null
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
        changeTemplate(state, template: string) {
            state.template = template;
        }
    },
    actions: {
        parseTracklist({commit, state}, rawTracklist: string) {
            console.debug(rawTracklist);
            const tracklist = cueParserService.parse(rawTracklist);
            if (tracklist != null) {
                commit(SET_TRACKLIST, tracklist);
                const output = tracklistDisplayService.transformTracklist(tracklist, state.template);
                if (output != null) {
                    console.debug(output);
                    commit(SET_OUTPUT, output);
                }
            }
        },
        clearTracklist({commit}) {
            commit(CLEAR_TRACKLIST);
        },
        async changeTemplate({commit, dispatch, state}, newTemplate: string) {
            commit(CHANGE_TEMPLATE, newTemplate);
            if (!!state.tracklist) {
                await dispatch(PARSE_TRACKLIST, state.tracklist);
            }
        }
    },
    getters: {}
}