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


    parse(text?: string | null | undefined): Tracklist | null {
        if (text === null || text === undefined || text === '') {
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
        return this.visitor.visit(cst);
    }
}

export const cueParserService = new CueparserService(cueVisitorService, cueLexerInstance, cueParserInstance);