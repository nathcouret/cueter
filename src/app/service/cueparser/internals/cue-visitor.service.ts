import {
    CueContext,
    DateTimeContext,
    StringLiteralContext,
    TimestampContext,
    TrackContext,
    TracksContext
} from "./context";
import {DateTime} from "luxon";
import {cueParserInstance} from "./cueParser";

const BaseCueVisitorParser = cueParserInstance.getBaseCstVisitorConstructor();

export class CueVisitorService extends BaseCueVisitorParser {
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

export const cueVisitorService = new CueVisitorService();