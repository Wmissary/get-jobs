/* eslint-disable sonarjs/no-duplicate-string */
// eslint-disable-next-line import/no-unresolved
import test from "node:test";
import assert from "node:assert";

import parseResponse from "../src/parser/index.js";

test("parseResponse function", async (t) => {
  await t.test("Should parse xml/rss feed", async () => {
    const response = {
      headers: {
        get: (header) => {
          if (header === "content-type") {
            return "application/rss";
          }
        },
      },
      text: () => "<xml>test</xml>",
    };
    const result = await parseResponse(response);
    assert.deepStrictEqual(result, {
      xml: "test",
    });
  });

  await t.test("Should parse html", async () => {
    const response = {
      headers: {
        get: (header) => {
          if (header === "content-type") {
            return "text/html";
          }
        },
      },
      text: () => "<html>test</html>",
    };
    const result = await parseResponse(response);
    assert.deepStrictEqual(result.querySelector("html").innerHTML, "test");
  });

  await t.test(
    'throws an error when "content-type" is not supported',
    async () => {
      const response = {
        headers: {
          get: (header) => {
            if (header === "content-type") {
              return "application/json";
            }
          },
        },
      };
      try {
        await parseResponse(response);
      } catch (error) {
        assert.deepStrictEqual(error.message, "Invalid content type");
      }
    }
  );
});
