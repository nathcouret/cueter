import {CstParser} from "chevrotain";
import {DateTime} from "luxon";
import {
    CueContext,
    DateTimeContext,
    StringLiteralContext,
    TimestampContext,
    TrackContext,
    TracksContext
} from "./context.ts";
import {
    cueLexerInstance,
    cueTokens,
    DATE,
    DateTimeCue,
    FILE,
    FILETYPE,
    INDEX,
    NumberLiteral,
    PERFORMER,
    RECORDED_BY,
    REM,
    StringLiteral,
    Timestamp,
    TITLE,
    TRACK,
    TRACKTYPE
} from "./lexer.ts";
import {Tracklist} from "../tracklist.ts";

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

export const cueParserInstance = new CueCstParser();

const BaseCueVisitorParser = cueParserInstance.getBaseCstVisitorConstructor();

export class CueVisitor extends BaseCueVisitorParser {
    constructor() {
        super();
        // The "validateVisitor" method is a helper utility which performs static analysis
        // to detect missing or redundant visitor methods
        this.validateVisitor();
    }

    cue(ctx: CueContext) {
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

    track(ctx: TrackContext) {
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

    tracks(ctx: TracksContext) {
        return ctx.track.map(track => this.visit(track)) || [];
    }

    dateLine(ctx: DateTimeContext) {
        const date = ctx.DateTime[0].image;
        return DateTime.fromFormat(date, "yyyy-MM-dd hh:mm a");
    }

    recordedByLine(ctx: StringLiteralContext) {
        return this.literalToString(ctx.StringLiteral[0]);
    }

    titleLine(ctx: StringLiteralContext) {
        return this.literalToString(ctx.StringLiteral[0]);
    }

    performerLine(ctx: StringLiteralContext) {
        return this.literalToString(ctx.StringLiteral[0]);
    }

    fileLine(ctx: StringLiteralContext) {
        return this.literalToString(ctx.StringLiteral[0]);
    }

    indexLine(ctx: TimestampContext) {
        return ctx.Timestamp[0].image;
    }

    private literalToString(stringLiteral: { image: string }) {
        const literal = stringLiteral.image;
        return literal.substring(1, literal.length - 1);
    }
}

export const cueVisitorInstance = new CueVisitor();

export function parseCueText(text: string): Tracklist {
    const lexingResult = cueLexerInstance.tokenize(text);
    if (lexingResult.errors.length > 0) {
        console.log("lexing errors");
        console.log(lexingResult.errors);
    }
    cueParserInstance.input = lexingResult.tokens;
    const cst = cueParserInstance.cue();
    if (cueParserInstance.errors.length > 0) {
        console.log("parsing errors");
        console.log(cueParserInstance.errors);
    }

    return cueVisitorInstance.visit(cst);
}
