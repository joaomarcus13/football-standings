import { getTable } from './templates/table.js';
import { getMatch } from './templates/match.js';
import { getLoading, getError } from './templates/status.js';

export default class ViewManager {
  constructor() {
    this.table = document.querySelector('#table');
    this.matches = document.querySelector('#matcheList');
    this.btnSideNav = document.querySelector('#btnSideNav');
    this.sideNav = document.querySelector('#sideNav');
    this.prevMatch = document.querySelector('#prevMatch');
    this.nextMatch = document.querySelector('#nextMatch');
    this.matchday = document.querySelector('#matchday');
    this.header = document.querySelector('#leagueInfo');
    this.dateTransform = new Intl.DateTimeFormat('pt', {
      locale: 'pt-br',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  configureSideNav(changeLeague) {
    const toggleSideNav = () => {
      this.sideNav.classList.toggle('openSidenav');
      this.btnSideNav.classList.toggle('active');
    };
    this.btnSideNav.onclick = () => toggleSideNav();

    Array.from(this.sideNav.children).forEach((li) => {
      li.onclick = (event) => {
        toggleSideNav();
        changeLeague(event.target.dataset.name);
      };
    });
  }

  configureNavMatchday(changeMatchday) {
    this.prevMatch.addEventListener('click', () => {
      changeMatchday((currentMatchday) => {
        if (currentMatchday > 0) return currentMatchday - 1;
      });
    });
    this.nextMatch.onclick = () => {
      changeMatchday((currentMatchday) => {
        if (currentMatchday < 38) return currentMatchday + 1;
      });
    };
  }

  _setPropertiesTable(table) {
    const getPointsPerformance = (points, playedGames) =>
      ((points / (playedGames * 3)) * 100).toFixed(1);
    const cleanTeamName = (name) =>
      name.replace(/\s[FC | SE]{2}$/, '').replace(/^[FC | SE]{2}\s/, '');

    table.forEach((item) => {
      item.team.name = cleanTeamName(item.team.name);
      item.performance = getPointsPerformance(item.points, item.playedGames);
    });
  }

  error(attr) {
    this[attr].innerHTML = getError();
  }

  generateHeader(league) {
    this.header.children[0].src = league.imgurl;
    this.header.children[1].innerText = league.name;
  }

  generateTable(table) {
    this._setPropertiesTable(table);
    const tableTemplate = getTable(table);
    this.table.innerHTML = tableTemplate;
  }

  setLoading() {
    const loadingTemplate = getLoading();
    this.table.innerHTML = loadingTemplate;
    this.matches.innerHTML = loadingTemplate;
  }

  _setPropertiesMatch(match, table) {
    const getCrestUrl = (id) => {
      const {
        team: { crestUrl },
      } = table.find((item) => item.team.id === id);

      return crestUrl;
    };
    const getDate = (date) => this.dateTransform.format(new Date(date));
    match.forEach((mtc) => {
      mtc.homeTeam.crestUrl ||= getCrestUrl(mtc.homeTeam.id);
      mtc.awayTeam.crestUrl ||= getCrestUrl(mtc.awayTeam.id);
      mtc.date ||= getDate(mtc.utcDate);
    });
  }

  generateMatchesList(match, currentMatchday, table) {
    this._setPropertiesMatch(match, table);
    this.matchday.innerHTML = `${currentMatchday}ª RODADA`;
    const matchTemplate = getMatch(match);
    this.matches.innerHTML = matchTemplate;
  }
}
