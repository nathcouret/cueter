import {CstNode, IToken} from "chevrotain";

export interface DateTimeContext {
    DateTime: IToken[];
}

export interface StringLiteralContext {
    StringLiteral: IToken[];
}

export interface TimestampContext {
    Timestamp: IToken[];
}

export interface NumberLiteralContext {
    NumberLiteral: IToken[];
}

export interface TrackContext extends NumberLiteralContext {
    titleLine: CstNode;
    performerLine: CstNode;
    fileLine: CstNode;
    indexLine: CstNode;
}

export interface TracksContext {
    track: CstNode[];
}

export interface CueContext {
    dateLine: CstNode;
    recordedByLine: CstNode;
    titleLine: CstNode;
    performerLine: CstNode;
    fileLine: CstNode;
    tracks: CstNode;
}

