export default class AppController {
  constructor({ leagues, viewManager, apiManager }) {
    this.apiManager = apiManager;
    this.viewManager = viewManager;
    this.leagues = leagues;
    this.league = leagues['brazil'];
    this.currentMatchday = 1;
    this.table = [];
    this.matches = null;
  }

  initialize() {
    this.apiManager.connect();
    this.viewManager.configureSideNav(this.changeLeague.bind(this));
    this.viewManager.configureNavMatchday(this.changeMatchday.bind(this));
    this._build();
  }

  async _build() {
    await this.generateTable();
    this.generateHeader();
    this.generateMatchesList();
  }

  changeLeague(league) {
    if (this.leagues[league] != this.league) {
      this.league = this.leagues[league];
      this.viewManager.setLoading();
      this._build();
    }
  }

  changeMatchday(matchday) {
    this.currentMatchday = matchday(this.currentMatchday);
    this.viewManager.generateMatchesList(
      this.getCurrentMatch(),
      this.currentMatchday,
      this.table
    );
  }

  getCurrentMatch() {
    return this.matches[this.currentMatchday];
  }

  async generateHeader() {
    this.viewManager.generateHeader(this.league);
  }

  async generateTable() {
    const { table, currentMatchday } = await this.apiManager.getStandings(
      this.league.id
    );
    this.table = table;
    this.currentMatchday = currentMatchday;
    this.viewManager.generateTable(table);
  }

  async generateMatchesList() {
    const allMatches = await this.apiManager.getMatches(
      this.league.id,
      this.currentMatchday
    );
    const matches = [...Array(39)].map((_) => []);
    allMatches.forEach((match) => {
      matches[match.matchday].push(match);
    });
    this.matches = matches;

    this.viewManager.generateMatchesList(
      this.getCurrentMatch(),
      this.currentMatchday,
      this.table
    );
  }
}
