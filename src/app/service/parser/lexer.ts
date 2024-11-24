import {createToken, Lexer} from "chevrotain";


const keyword = createToken({
    name: 'keyword',
    pattern: Lexer.NA,
});

const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED,
});

export const StringLiteral = createToken({
    name: "StringLiteral",
    pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/,
});

export const DateTimeCue = createToken({
    name: "DateTime",
    pattern: /\d{4}-\d{2}-\d{2} [0-1]\d:[0-5]\d (AM|PM)/
});

export const Timestamp = createToken({
    name: "Timestamp",
    pattern: /\d{2}:[0-5]\d:[0-5]\d/
});

export const NumberLiteral = createToken({
    name: "NumberLiteral",
    pattern: /\d+/,
    longer_alt: Timestamp
});

export const REM = createToken({name: "REM", pattern: /REM/, categories: [keyword]});
export const DATE = createToken({name: "DATE", pattern: /DATE/, categories: [keyword]});
export const RECORDED_BY = createToken({name: "RECORDED_BY", pattern: /RECORDED_BY/, categories: [keyword]});
export const TITLE = createToken({name: "TITLE", pattern: /TITLE/, categories: [keyword]});
export const FILE = createToken({name: "FILE", pattern: /FILE/, categories: [keyword]});
export const PERFORMER = createToken({name: "PERFORMER", pattern: /PERFORMER/, categories: [keyword]});
export const TRACK = createToken({name: "TRACK", pattern: /TRACK/, categories: [keyword]});
export const INDEX = createToken({name: "INDEX", pattern: /INDEX/, categories: [keyword]});

export const FILETYPE = createToken({name: "AUDIOTYPE", pattern: /(WAVE)/});
export const TRACKTYPE = createToken({name: "TRACKTYPE", pattern: /(AUDIO)/});

export const cueTokens = [
    REM,
    DATE,
    RECORDED_BY,
    TITLE,
    PERFORMER,
    FILE,
    FILETYPE,
    TRACK,
    TRACKTYPE,
    INDEX,
    StringLiteral,
    DateTimeCue,
    NumberLiteral,
    Timestamp,
    WhiteSpace,
];

export const cueLexerInstance = new Lexer(cueTokens, {
    positionTracking: 'onlyStart',
    ensureOptimizations: true
});