import Provider from "../classes/provider.js";

export const poleEmploi = new Provider({
  name: "poleEmploi",
  url: (jobName) =>
    `https://candidat.pole-emploi.fr/offres/recherche?lieux=16015&motsCles=${jobName}`,
  transform: (response) => {
    const jobs = response.querySelectorAll(".result");
    return jobs.map((job) => {
      const id = job._attrs["data-id-offre"];
      const title = job.querySelector(".media-heading").textContent;
      const company = getCompanyFromPoleEmploiSubtext(
        job.querySelector(".subtext").textContent
      );
      const location = getLocationFromPoleEmploiSubtext(
        job.querySelector(".subtext").textContent
      );
      const date = job.querySelector(".date").textContent;
      const description = job.querySelector(".description").textContent;
      const url = `https://candidat.pole-emploi.fr${
        job.querySelector(".media")._attrs.href
      }`;
      return {
        id,
        title,
        company,
        location,
        date,
        description,
        url,
      };
    });
  },
});

export function getCompanyFromPoleEmploiSubtext(subtext) {
  const company = subtext.replace(/\r?\n|\r/g, "").split("-");
  if (company.length === 3) {
    return company[0].trim();
  }
}

export function getLocationFromPoleEmploiSubtext(subtext) {
  const location = subtext.replace(/\r?\n|\r/g, "").split("-");
  if (location.length === 3) {
    return `${location[2].trim()} (${location[1].trim()})`;
  }

  return `${location[1].trim()} (${location[0].trim()})`;
}
