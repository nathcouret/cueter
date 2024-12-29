import {Lexer} from "chevrotain";
import {InjectionToken} from "@angular/core";
import {cueTokens} from "./tokens";

export const cueLexerInstance = new Lexer(cueTokens, {
    positionTracking: 'full',
    ensureOptimizations: true
});

export const CUE_LEXER_TOKEN = new InjectionToken<Lexer>("cue lexer singleton");