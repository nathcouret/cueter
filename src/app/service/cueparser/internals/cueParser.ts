import {CstParser} from "chevrotain";
import {
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
} from "./tokens";

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