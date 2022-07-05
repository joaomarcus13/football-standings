const getRow = (item) => {
  return `<tr><td> <div>${item.position}</div>  <span>-</span>  <img src=${item.team.crestUrl} alt="logoTeam" />  <div> ${item.team.name}</div></td>
                <td><div>${item.points}</div></td>
                <td>${item.playedGames}</td>
                <td>${item.won}</td>
                <td>${item.draw}</td>
                <td>${item.lost}</td>
                <td>${item.goalsFor}</td>
                <td>${item.goalsAgainst}</td>
                <td>${item.goalDifference}</td>
                <td>${item.performance}</td>
              </tr>`;
};

export const getTable = (data) => {
  return `<table>
            <thead>
              <tr>
                <th>classificacão</th>
                <th>p</th>
                <th>j</th>
                <th>v</th>
                <th>e</th>
                <th>d</th>
                <th>gp</th>
                <th>gc</th>
                <th>sg</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((item) => getRow(item)).join('')}
            </tbody>
          </table>`;
};
