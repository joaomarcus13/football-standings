const getLi = (game) => {
  return `<li>
              <div class="matche">
                <div class="team">
                  <img
                    src=${game.homeTeam.crestUrl}
                    alt=${game.homeTeam.name}
                  />
                  <span>${game.homeTeam.name}</span>
                </div>
                <div class="info">
                  <div>${game.date}</div>
                  <div class="scoreboard">
                  <span>${game.score.fullTime.homeTeam ?? ''}</span>
                  <span>&#10006;</span>
                  <span>${game.score.fullTime.awayTeam ?? ''}</span>
                  </div>
                </div>
                <div class="team">
                  <img
                    src=${game.awayTeam.crestUrl}
                    alt=${game.awayTeam.name}
                  />
                  <span>${game.awayTeam.name}</span>
                </div>
              </div>
            </li>
    `;
};

export const getMatch = (match) => {
  return `
          <ul>
           ${match.map((game) => getLi(game)).join('')}
        </ul>
    `;
};
