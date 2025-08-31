import {createToken, Lexer} from "chevrotain";

const Keyword = createToken({
    name: 'keyword',
    pattern: Lexer.NA,
});

const Carets = createToken({
    name: 'carets',
    pattern: Lexer.NA
})

const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED,
});

export const StringValue = createToken({
    name: "StringValue",
    pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/,
});

export const Identifier = createToken({
    name: "Identifier",
    pattern: /[a-zA-Z]\w*/,
    categories: [Keyword]
})

export const OpeningCaret = createToken({
    name: "OpeningCaret",
    pattern: /</,
    categories: [Carets]
});

export const ClosingCaret = createToken({
    name: "ClosingCaret",
    pattern: />/,
    categories: [Carets]
});

export const ClosingTagOpeningCaret = createToken({
    name: "ClosingTagOpeningCaret",
    pattern: /<\//,
    categories: [Carets]
});

export const SelfClosedTagClosingCaret = createToken({
    name: "SelfClosedTagClosingCaret",
    pattern: /\/>/,
    categories: [Carets]
});

export const EQUALS = createToken({
    name: "EQUALS",
    pattern: /=/,
});

export const XmlOpeningTag = createToken({
    name: "XmlOpeningTag",
    pattern: /<\?xml/,
});

export const XmlClosingTag = createToken({
    name: "XmlClosingTag",
    pattern: /\?>/
});

export const DJ_PLAYLISTS = createToken({
    name: "DJ_PLAYLISTS",
    pattern: /DJ_PLAYLISTS/,
    longer_alt: Identifier,
    categories: [Keyword]
});

export const NODE = createToken({
    name: "NODE",
    pattern: /NODE/,
    longer_alt: Identifier,
    categories: [Keyword]
});

export const TRACK = createToken({
    name: "TRACK",
    pattern: /TRACK/,
    longer_alt: Identifier,
    categories: [Keyword]
});

export const PRODUCT = createToken({
    name: "PRODUCT",
    pattern: /PRODUCT/,
    longer_alt: Identifier,
    categories: [Keyword]
});

export const COLLECTION = createToken({
    name: "COLLECTION",
    pattern: /COLLECTION/,
    longer_alt: Identifier,
    categories: [Keyword]
});

export const PLAYLISTS = createToken({
    name: "PLAYLISTS",
    pattern: /PLAYLISTS/,
    longer_alt: Identifier,
    categories: [Keyword]
});

export const TEMPO = createToken({
    name: "TEMPO",
    pattern: /TEMPO/,
    longer_alt: Identifier,
    categories: [Keyword]
});

export const POSITION_MARK = createToken({
    name: "POSITION_MARR",
    pattern: /POSITION_MARK/,
    longer_alt: Identifier,
    categories: [Keyword]
});

export const xmlTokens = [
    EQUALS,
    DJ_PLAYLISTS,
    PRODUCT,
    COLLECTION,
    NODE,
    TRACK,
    PLAYLISTS,
    TEMPO,
    POSITION_MARK,
    Identifier,
    ClosingCaret,
    ClosingTagOpeningCaret,
    SelfClosedTagClosingCaret,
    XmlOpeningTag,
    XmlClosingTag,
    OpeningCaret,
    StringValue,
    WhiteSpace,
];