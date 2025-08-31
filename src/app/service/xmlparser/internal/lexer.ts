import {ILexerConfig, Lexer} from "chevrotain";
import {xmlTokens} from "./tokens";

const lexerConfig: ILexerConfig = {
    positionTracking: "full",
    ensureOptimizations: false,
    skipValidations: false,
}

export const xmlLexer = new Lexer(xmlTokens, lexerConfig);