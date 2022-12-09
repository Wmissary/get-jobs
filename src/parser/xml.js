import { XMLParser } from "fast-xml-parser";

import Parser from "../classes/parser.js";

export const xml = new Parser({
  name: "xml",
  parse: async (response) => {
    const stringResponse = await response.text();
    const parser = new XMLParser();
    return parser.parse(stringResponse);
  },
});
