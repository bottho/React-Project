import React from 'react';

class PlayerList extends React.Component {
  constructor() {
    super();
    this.state = {
      players : []
    };
  }

  componentDidMount(){
    var that = this;
    var url = "https://www.mysportsfeeds.com/api/feed/sample/pull/nhl/2016-2017-regular/daily_player_stats.json?fordate=20161012&";

    fetch(url)
      .then(function(response) {
        if(response.status >= 400)
        {
          throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(data){
      that.setState({ players : data.dailyplayerstats.playerstatsentry });
    })
  }

  render() {
    return (
      <div>
        <Player playerData = {this.state.players} />
      </div>
    );
  }
}

function Player(playerData)
{
  var players = playerData.playerData;
  var output = <div>No player data</div>;
  if(players.length)
  {
    output = players.map((item) => PlayerName(item));
  }
  return <div>{output}</div>;
}

function PlayerName(item)
{
  console.log(item);
  return (
    <div className="playerObj" key={item.player.Id} >
      <div className="playerName">{item.player.LastName}, {item.player.FirstName}</div>
      <div className="playerCity">{item.team.City} {item.team.Name}</div>
    </div>
  );
}

export default PlayerList;
