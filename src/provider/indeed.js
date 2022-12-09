import Provider from "../classes/provider.js";

export const indeed = new Provider({
  name: "indeed",
  url: (jobName, location) =>
    `https://fr.indeed.com/rss?q=${jobName}&l=${location}`,
  transform: (response) => {
    const jobs = response.rss.channel.item;
    return jobs
      ? jobs.map((job) => ({
          id: job.guid,
          title: getTitleFromIndeedTitle(job.title),
          description: job.description,
          location: getLocationFromIndeedTitle(job.title),
          company: getCompanyFromIndeedTitle(job.title),
          url: job.link,
          date: job.pubDate,
        }))
      : [];
  },
});

// Indeed Utils
export function getLocationFromIndeedTitle(title) {
  const location = title.split(" - ");
  return location[location.length - 1];
}

export function getCompanyFromIndeedTitle(title) {
  const company = title.split(" - ");
  return company[1];
}

export function getTitleFromIndeedTitle(title) {
  const jobTitle = title.split(" - ");
  return jobTitle[0];
}
