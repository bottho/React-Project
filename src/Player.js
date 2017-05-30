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
      <div className="row">
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
  return <div className="btn btn-group-vertical">{output}</div>;
}

function PlayerName(item)
{
  console.log(item.player);
  return (
    <div className={ "col-xs-12 col-md-6 team-" + item.team.ID } key={item.player.Id} >
      <h3 className="playerName">{item.player.LastName}, {item.player.FirstName}</h3>
      <small className="playerCity">{item.team.City} {item.team.Name}</small>
    </div>
  );
}

function PlayerStats(item)
{
  return (
    <div className="">
    </div>
  );
}

export default PlayerList;
