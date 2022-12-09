// eslint-disable-next-line import/no-unresolved
import test from "node:test";
import assert from "node:assert";

import {
  getTitleFromIndeedTitle,
  getCompanyFromIndeedTitle,
  getLocationFromIndeedTitle,
  indeed,
} from "../../src/provider/indeed.js";

test("Indeed utils", () => {
  const title = "Développeur Web - Compagny - Angoulême (16)";
  assert.strictEqual(getTitleFromIndeedTitle(title), "Développeur Web");
  assert.strictEqual(getCompanyFromIndeedTitle(title), "Compagny");
  assert.strictEqual(getLocationFromIndeedTitle(title), "Angoulême (16)");
});

test("Indeed provider", () => {
  const job = {
    guid: "test",
    title: "Développeur Web - Compagny - Angoulême (16)",
    description: "test",
    link: "https://test.com",
    pubDate: "test",
  };
  const expectedJob = {
    id: "test",
    title: "Développeur Web",
    description: "test",
    location: "Angoulême (16)",
    company: "Compagny",
    url: "https://test.com",
    date: "test",
  };
  assert.deepStrictEqual(
    indeed.transformResponse({ rss: { channel: { item: [job] } } }),
    [expectedJob]
  );
});
