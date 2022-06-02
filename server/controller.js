import Service from './service.js';

export default class Controller {
  constructor() {
    this.service = new Service();
  }

  async getStandings(req, res) {
    const id = req.params.id;
    const standings = await this.service.getStandings(id);
    if (!standings) {
      return res.status(500).send('Internal Server Error');
    }
    return res.json(standings);
  }

  async getMatches(req, res) {
    const id = req.params.id;
    const matches = await this.service.getMatches(id);
    if (!matches) {
      return res.status(500).send('Internal Server Error');
    }
    return res.json(matches);
  }
}
