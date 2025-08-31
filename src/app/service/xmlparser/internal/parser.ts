import {CstParser, IParserConfig} from "chevrotain";
import {
    ClosingCaret,
    ClosingTagOpeningCaret,
    EQUALS,
    Identifier,
    OpeningCaret,
    SelfClosedTagClosingCaret,
    StringValue,
    XmlClosingTag,
    XmlOpeningTag,
    xmlTokens
} from "./tokens";

const parserConfig: IParserConfig = {
    recoveryEnabled: true,
    skipValidations: false,
    traceInitPerf: true,
    nodeLocationTracking: "full"
}

export class XmlCstParser extends CstParser {
    constructor() {
        super(xmlTokens, parserConfig);
        // very important to call this after all the rules have been setup.
        // otherwise the parser may not work correctly as it will lack information
        // derived from the self analysis.
        this.performSelfAnalysis();
    }

    public xmlNode = this.RULE("xmlNode", () => {
        this.CONSUME(OpeningCaret);
        this.CONSUME(Identifier);
        this.MANY(() => {
            this.SUBRULE(this.attribute);
        });
        this.OR([
            {
                ALT: () => {
                    this.CONSUME(SelfClosedTagClosingCaret);
                }
            },
            {
                ALT: () => {
                    this.CONSUME(ClosingCaret);
                    this.MANY2(() => {
                        this.SUBRULE(this.xmlNode);
                    });
                    this.CONSUME(ClosingTagOpeningCaret);
                    this.CONSUME2(Identifier);
                    this.CONSUME2(ClosingCaret);
                }
            }
        ])
    });
    public xmlDocument = this.RULE("xmlDocument", () => {
        this.SUBRULE(this.xmlHeader);
        this.SUBRULE(this.xmlNode);
    })
    public attribute = this.RULE("attribute", () => {
        this.CONSUME(Identifier);
        this.CONSUME(EQUALS);
        this.CONSUME(StringValue);
    });
    public xmlHeader = this.RULE("xmlHeader", () => {
        this.CONSUME(XmlOpeningTag);
        this.MANY({
            DEF: () => this.SUBRULE(this.attribute)
        });
        this.CONSUME(XmlClosingTag);
    });
}

export const xmlParser = new XmlCstParser();