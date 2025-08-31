import fs from "node:fs";
import {xmlLexer} from "./internal/lexer";
import {xmlParser} from "./internal/parser";

const rawFile = fs.readFileSync("/Users/nathou/Documents/git/cueter/data/tata.xml", "utf-8");

const lexingResult = xmlLexer.tokenize(rawFile.trim());
if (lexingResult.errors.length > 0) {
    console.error(lexingResult.errors);
} else {
    console.log(lexingResult.tokens);
    xmlParser.input = lexingResult;
    const cst = xmlParser.xmlDocument();
    if (xmlParser.errors.length > 0) {
        console.error(xmlParser.errors);
    }
}

