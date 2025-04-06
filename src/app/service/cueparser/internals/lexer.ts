import {ILexerConfig, Lexer} from "chevrotain";
import {cueTokens} from "./tokens";

const lexerConfig: ILexerConfig = {
    positionTracking: "full",
    ensureOptimizations: true,
    skipValidations: import.meta.env.PROD,
    traceInitPerf: import.meta.env.DEV
}

export const cueLexerInstance = new Lexer(cueTokens, lexerConfig);