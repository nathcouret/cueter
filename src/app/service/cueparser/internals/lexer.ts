import {Lexer} from "chevrotain";
import {cueTokens} from "./tokens";

export const cueLexerInstance = new Lexer(cueTokens, {
    positionTracking: 'full',
    ensureOptimizations: true
});