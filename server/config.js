import 'dotenv/config';
export const apiconfig = {
  baseURL: 'http://api.football-data.org/v2/',
  headers: { 'X-Auth-Token': process.env.TOKEN },
};
