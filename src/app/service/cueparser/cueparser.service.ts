import {Inject, Injectable} from "@angular/core";
import {Lexer} from "chevrotain";
import {CUE_PARSER_TOKEN, CueCstParser} from "./internals/cueParser";
import {Tracklist} from "../../model/tracklist";
import {CueVisitorService} from "./internals/cue-visitor.service";
import {CUE_LEXER_TOKEN} from "./internals/lexer";

@Injectable({
    providedIn: 'root'
})
export class CueparserService {

    public constructor(
        private visitor: CueVisitorService,
        @Inject(CUE_LEXER_TOKEN) private lexer: Lexer,
        @Inject(CUE_PARSER_TOKEN) private parser: CueCstParser
    ) {

    }


    parse(text?: string | null | undefined): Tracklist | null {
        if (text === null || text === undefined || text === '') {
            console.error('Provided data is empty');
            return null;
        }
        const lexingResult = this.lexer.tokenize(text.trim());
        if (lexingResult.errors.length > 0) {
            console.log("lexing errors");
            console.log(lexingResult.errors);
        }
        this.parser.input = lexingResult.tokens;
        const cst = this.parser.cue();
        if (this.parser.errors.length > 0) {
            console.log("parsing errors");
            console.log(this.parser.errors);
        }
        return this.visitor.visit(cst);
    }

}