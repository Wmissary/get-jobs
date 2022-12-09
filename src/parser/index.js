import { xml } from "./xml.js";
import { html } from "./html.js";

export default async function parseResponse(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/rss")) {
    return xml.parseResponse(response);
  }
  if (contentType && contentType.includes("html")) {
    return html.parseResponse(response);
  }
  throw new Error("Invalid content type");
}
