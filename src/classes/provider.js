export default class Provider {
  #transform;
  constructor({ name, url, transform }) {
    this.name = name;
    this.url = url;
    this.#transform = transform;
  }
  transformResponse(response) {
    return this.#transform(response);
  }
}
