import { kSetProvider } from "./src/provider/index.js";
import parseResponse from "./src/parser/index.js";

export default async function getJobsData(name, location) {
  try {
    const data = await Promise.all(
      [...kSetProvider].map(async (provider) => {
        const url = provider.url(name, location);
        const response = await fetch(url);
        if (response.ok) {
          const data = await parseResponse(response);
          return provider.transformResponse(data);
        } else {
          return [];
        }
      })
    );
    return data.flat();
  } catch {
    throw new Error("Error fetching data");
  }
}
