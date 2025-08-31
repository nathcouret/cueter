import {XMLParser} from "fast-xml-parser";
import fs from "node:fs";

const rawFile = fs.readFileSync("/Users/nathou/Documents/git/cueter/data/boiterekord.xml", "utf-8");

const arrays = [
    'DJ_PLAYLISTS.COLLECTION.TRACK',
    'DJ_PLAYLISTS.PLAYLISTS.NODE'
]

const parser = new XMLParser({
    ignoreAttributes: false,
    isArray: (name, jpath, isLeafNode, isAttribute) => {
        if ((name === "TRACK" || name === "NODE") && !isLeafNode && !isAttribute) {
            return true;
        }
        return false;
    }
});
const library = parser.parse(rawFile);

console.info(library);