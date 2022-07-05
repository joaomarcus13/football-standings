import axios from 'axios';
import { apiconfig } from './config.js';
import * as data from '../app/src/config/mock.js';

export default class Service {
  constructor() {
    this.connection = axios.create(apiconfig);
  }

  async getStandings(id) {
    try {
      const resp = await this.connection.get(`/competitions/${id}/standings`);
      return {
        currentMatchday: resp.data.season.currentMatchday,
        table: resp.data.standings[0].table,
      };
      return {
        currentMatchday: data.tableMock.currentMatchday,
        table: data.tableMock.table,
      };
    } catch (error) {
      return null;
    }
  }
  async getMatches(id) {
    try {
      const matches = await this.connection.get(`/competitions/${id}/matches`);
      return matches.data.matches;
      return data.matchMock.matches;
    } catch (error) {
      return null;
    }
  }
}
