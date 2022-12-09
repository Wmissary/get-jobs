export default class Parser {
  #parse;
  constructor({ name, parse }) {
    this.name = name;
    this.#parse = parse;
  }
  async parseResponse(response) {
    return this.#parse(response);
  }
}
