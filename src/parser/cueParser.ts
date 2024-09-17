import {createToken, CstParser, Lexer} from "chevrotain";
import {DateTime} from "luxon";

const StringLiteral = createToken({
    name: "StringLiteral",
    pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/,
});

const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED,
});

const DateTimeCue = createToken({
    name: "DateTime",
    pattern: /\d{4}-\d{2}-\d{2} [0-1]\d:[0-5]\d (AM|PM)/
});

const Timestamp = createToken({
    name: "Timestamp",
    pattern: /\d{2}:[0-5]\d:[0-5]\d/
});

const NumberLiteral = createToken({
    name: "NumberLiteral",
    pattern: /\d+/,
    longer_alt: Timestamp
});

const REM = createToken({name: "REM", pattern: /REM/});
const DATE = createToken({name: "DATE", pattern: /DATE/});
const RECORDED_BY = createToken({name: "RECORDED_BY", pattern: /RECORDED_BY/});
const TITLE = createToken({name: "TITLE", pattern: /TITLE/});
const FILE = createToken({name: "FILE", pattern: /FILE/});
const PERFORMER = createToken({name: "PERFORMER", pattern: /PERFORMER/});
const FILETYPE = createToken({name: "AUDIOTYPE", pattern: /(WAVE)/});
const TRACKTYPE = createToken({name: "TRACKTYPE", pattern: /(AUDIO)/});
const TRACK = createToken({name: "TRACK", pattern: /TRACK/});
const INDEX = createToken({name: "INDEX", pattern: /INDEX/});

const cueTokens = [
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

export const cueLexer = new Lexer(cueTokens, {});

export class CueCstParser extends CstParser {
    constructor() {
        super(cueTokens, {
            recoveryEnabled: true,
        });
        // very important to call this after all the rules have been setup.
        // otherwise the parser may not work correctly as it will lack information
        // derived from the self analysis.
        this.performSelfAnalysis();
    }


    public cue = this.RULE("cue", () => {
        this.SUBRULE(this.dateLine);
        this.SUBRULE(this.recordedByLine);
        this.SUBRULE(this.titleLine);
        this.SUBRULE(this.performerLine);
        this.SUBRULE(this.fileLine);
        this.SUBRULE(this.tracks);
    });

    public dateLine = this.RULE("dateLine", () => {
        this.CONSUME(REM);
        this.CONSUME(DATE);
        this.CONSUME(DateTimeCue);
    });

    public recordedByLine = this.RULE("recordedByLine", () => {
        this.CONSUME(REM);
        this.CONSUME(RECORDED_BY);
        this.CONSUME(StringLiteral);
    });

    public titleLine = this.RULE("titleLine", () => {
        this.CONSUME(TITLE);
        this.CONSUME(StringLiteral);
    });

    public performerLine = this.RULE("performerLine", () => {
        this.CONSUME(PERFORMER);
        this.CONSUME(StringLiteral);
    });

    public fileLine = this.RULE("fileLine", () => {
        this.CONSUME(FILE);
        this.CONSUME(StringLiteral);
        this.CONSUME(FILETYPE);
    });

    public indexLine = this.RULE("indexLine", () => {
        this.CONSUME(INDEX);
        this.CONSUME(NumberLiteral);
        this.CONSUME(Timestamp);
    });

    public track = this.RULE("track", () => {
        this.CONSUME(TRACK);
        this.CONSUME(NumberLiteral);
        this.CONSUME(TRACKTYPE);
        this.SUBRULE(this.titleLine);
        this.SUBRULE(this.performerLine);
        this.SUBRULE(this.fileLine);
        this.SUBRULE(this.indexLine);
    });

    public tracks = this.RULE("tracks", () => {
        this.MANY({
            DEF: () => {
                this.SUBRULE(this.track);
            }
        });
    });

}

export const parserInstance = new CueCstParser();

const BaseCueVisitorParser = parserInstance.getBaseCstVisitorConstructor();

export class CueVisitor extends BaseCueVisitorParser {
    constructor() {
        super();
        // The "validateVisitor" method is a helper utility which performs static analysis
        // to detect missing or redundant visitor methods
        this.validateVisitor();
    }

    cue(ctx) {
        const date = this.visit(ctx.dateLine);
        const recordedBy = this.visit(ctx.recordedByLine);
        const title = this.visit(ctx.titleLine);
        const performer = this.visit(ctx.performerLine);
        const file = this.visit(ctx.fileLine);
        const tracks = this.visit(ctx.tracks);

        return {
            date,
            recordedBy,
            title,
            performer,
            file,
            tracks
        }
    }

    track(ctx) {
        const index = ctx.NumberLiteral[0].image;
        const title = this.visit(ctx.titleLine);
        const performer = this.visit(ctx.performerLine);
        const file = this.visit(ctx.fileLine);
        const timestamp = this.visit(ctx.indexLine);

        return {
            index,
            title,
            performer,
            file,
            timestamp
        }
    }

    tracks(ctx) {
        return ctx.track.map(track => this.visit(track)) || [];
    }

    dateLine(ctx) {
        const date = ctx.DateTime[0].image;
        return DateTime.fromFormat(date, "yyyy-MM-dd hh:mm a");
    }

    recordedByLine(ctx) {
        return this.literalToString(ctx.StringLiteral[0]);
    }

    titleLine(ctx) {
        return this.literalToString(ctx.StringLiteral[0]);
    }

    performerLine(ctx) {
        return this.literalToString(ctx.StringLiteral[0]);
    }

    fileLine(ctx) {
        return this.literalToString(ctx.StringLiteral[0]);
    }

    indexLine(ctx) {
        return ctx.Timestamp[0].image;
    }

    private literalToString(stringLiteral: { image: string }) {
        const literal = stringLiteral.image;
        return literal.substring(1, literal.length - 1);
    }
}

export const visitorInstance = new CueVisitor();

export function parseCueText(text: string): string {
    const lexingResult = cueLexer.tokenize(text);
    if (lexingResult.errors.length > 0) {
        console.log("lexing errors");
        console.log(lexingResult.errors);
    }
    parserInstance.input = lexingResult.tokens;
    const cst = parserInstance.cue();
    if (parserInstance.errors.length > 0) {
        console.log("parsing errors");
        console.log(parserInstance.errors);
    }

    const result = visitorInstance.visit(cst);
    return result;
}
