export default class AppController {
  constructor({ leagues, viewManager, apiManager }) {
    this.apiManager = apiManager;
    this.viewManager = viewManager;
    this.leagues = leagues;
    this.league = leagues['brazil'];
    this.currentMatchday = 1;
    this.table = [];
    this.matches = [];
  }

  initialize() {
    this.viewManager.configureSideNav(this.changeLeague.bind(this));
    this.viewManager.configureNavMatchday(this.changeMatchday.bind(this));
    this.viewManager.configureHeaderTable();
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
    this.currentMatchday =
      matchday(this.currentMatchday, this.numberOfMatches()) ||
      this.currentMatchday;
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
    const data = await this.apiManager.getStandings(this.league.id);
    if (!data) {
      this.viewManager.error('table');
      return;
    }

    this.table = data.table;
    this.currentMatchday = data.currentMatchday;
    this.viewManager.generateTable(data.table);
  }

  numberOfMatches() {
    return this.table.length * 2 - 2;
  }

  async generateMatchesList() {
    const allMatches = await this.apiManager.getMatches(
      this.league.id,
      this.currentMatchday
    );
    if (!allMatches) {
      this.viewManager.error('matches');
      return;
    }
    const matches = [...Array(this.numberOfMatches() + 1)].map((_) => []);
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
