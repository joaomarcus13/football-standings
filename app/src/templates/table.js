const getRow = (item) => {
  return `<tr><td> <div>${item.position}</div>  <span>-</span>  <img src=${item.team.crestUrl} alt="logoTeam" />  <div> ${item.team.name}</div></td>
                <td><div>${item.points}</div></td>
                <td><div>${item.playedGames}</div></td>
                <td><div>${item.won}</div></td>
                <td><div>${item.draw}</div></td>
                <td><div>${item.lost}</div></td>
                <td><div>${item.goalsFor}</div></td>
                <td><div>${item.goalsAgainst}</div></td>
                <td><div>${item.goalDifference}</div></td>
                <td><div>${item.performance}</div></td>
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
