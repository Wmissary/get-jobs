// eslint-disable-next-line import/no-unresolved
import test from "node:test";
import assert from "node:assert";

import {
  poleEmploi,
  getCompanyFromPoleEmploiSubtext,
  getLocationFromPoleEmploiSubtext,
} from "../../src/provider/pole-emploi.js";

test("pole-emploi utils", () => {
  const title = "Compagny - 16 - Angoulême";

  assert.strictEqual(getCompanyFromPoleEmploiSubtext(title), "Compagny");
  assert.strictEqual(getLocationFromPoleEmploiSubtext(title), "Angoulême (16)");
});

test("pole-emploi provider", () => {
  const expectedJob = {
    id: "test",
    title: "Développeur Web",
    description: "test",
    location: "Angoulême (16)",
    company: "Compagny",
    url: `https://candidat.pole-emploi.fr`,
    date: "test",
  };

  const html = {
    querySelectorAll: () => [
      {
        _attrs: {
          "data-id-offre": "test",
        },
        querySelector: (selector) => {
          if (selector === ".media-heading") {
            return {
              textContent: "Développeur Web",
            };
          }
          if (selector === ".subtext") {
            return {
              textContent: "Compagny - 16 - Angoulême",
            };
          }
          if (selector === ".date") {
            return {
              textContent: "test",
            };
          }
          if (selector === ".description") {
            return {
              textContent: "test",
            };
          }
          if (selector === ".media") {
            return {
              _attrs: {
                href: "",
              },
            };
          }
        },
      },
    ],
  };

  const jobs = poleEmploi.transformResponse(html);
  assert.deepStrictEqual(jobs[0], expectedJob);
});
