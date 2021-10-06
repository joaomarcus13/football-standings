export default class ApiManager {
  constructor({ baseURL, headers }) {
    this.baseURL = baseURL;
    this.headers = headers;
    this.connection = {};
  }

  connect() {
    this.connection = axios.create({
      baseURL: this.baseURL,
      headers: this.headers,
    });
  }

  async getStandings(id) {
    try {
      const resp = await this.connection.get(`/competitions/${id}/standings`);
      return {
        currentMatchday: resp.data.season.currentMatchday,
        table: resp.data.standings[0].table,
      };
    } catch (error) {
      return null;
    }
  }

  async getMatches(id) {
    try {
      const matches = await this.connection.get(`/competitions/${id}/matches`);
      return matches.data.matches;
    } catch (error) {
      console.log('error:', error);
      return null;
    }
  }
}
