export default class ApiManager {
  async getStandings(id) {
    try {
      const { data } = await axios.get(`/standings/${id}`);
      return data;
    } catch (error) {
      return null;
    }
  }

  async getMatches(id) {
    try {
      const { data } = await axios.get(`/matches/${id}`);
      return data;
    } catch (error) {
      return null;
    }
  }
}
