// eslint-disable-next-line import/no-unresolved
import test from "node:test";
import assert from "node:assert";

import Provider from "../../src/classes/provider.js";

test("Provider class", () => {
  const provider = new Provider({
    name: "test",
    url: "https://test.com",
    transform: (response) => response,
  });
  assert.strictEqual(provider.name, "test");
  assert.strictEqual(provider.url, "https://test.com");
  assert.strictEqual(provider.transformResponse("test"), "test");
});
