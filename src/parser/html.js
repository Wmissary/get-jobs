import { parse } from "node-html-parser";

import Parser from "../classes/parser.js";

export const html = new Parser({
  name: "html",
  parse: async (response) => {
    const stringResponse = await response.text();
    return parse(stringResponse);
  },
});
