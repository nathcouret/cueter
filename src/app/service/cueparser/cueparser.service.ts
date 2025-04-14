import {Lexer} from "chevrotain";
import {CueCstParser, cueParserInstance} from "./internals/cueParser";
import {Tracklist} from "../../model/tracklist";
import {cueVisitorService, CueVisitorService} from "./internals/cue-visitor.service";
import {cueLexerInstance} from "./internals/lexer";

export class CueparserService {

    public constructor(
        private visitor: CueVisitorService, private lexer: Lexer, private parser: CueCstParser
    ) {

    }


    public parse(text: string | null): Tracklist | null {
        if (text === null || text === '') {
            console.error('Provided data is empty');
            return null;
        }
        const lexingResult = this.lexer.tokenize(text.trim());
        if (lexingResult.errors.length > 0) {
            console.error("lexing errors");
            console.error(lexingResult.errors);
        }
        this.parser.input = lexingResult.tokens;
        const cst = this.parser.cue();
        if (this.parser.errors.length > 0) {
            console.error("parsing errors");
            console.error(this.parser.errors);
        }
        const tracklist = this.visitor.visit(cst);
        if (tracklist !== null) {
            this.postprocess(tracklist);
        }
        return tracklist;
    }

    private postprocess(tracklist: Tracklist) {
        const tracks = tracklist.tracks;
        const lastTrack = tracks[tracks.length - 1];
        const times = lastTrack.timestamp.split(":");
        tracklist.exceedHour = times.length === 3 && times[0] !== "00";
    }
}

export const cueParserService = new CueparserService(cueVisitorService, cueLexerInstance, cueParserInstance);