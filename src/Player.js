import React from 'react';

class PlayerList extends React.Component {
  constructor() {
    super();
    this.state = {
      players : [],
      sort : "Team",
      selectedPlayer : []
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
      that.setState({ players : data.dailyplayerstats.playerstatsentry })
    })
  }

  render() {
    var output = <div>No player data</div>;

    if(this.state.players.length)
    {
      output = this.state.players.map((item) => <PlayerName key = {item.player.Id} player = {item} selectClick = {this.selectPlayer.bind(this, item)} selectedPlayer={this.state.selectedPlayer} />);
    }

    return (
      <div className="row">
        <SortButtons
          sortByTeam = {this.sortTeam.bind(this)}
          sortByPosition = {this.sortPosition.bind(this)}
          sortByName = {this.sortName.bind(this)} />

        <div key="PlayerList" className="playerList col-md-6 col-xs-12">{output}</div>

        <PlayerStats selectedPlayer = {this.state.selectedPlayer} />
      </div>
    );
  }

  sortTeam()
  {
    this.setState({sort:"Team"});

    var sortedPlayers = this.state.players.sort(function(a,b){
      return a.team.ID - b.team.ID;
    });

    this.setState({players: sortedPlayers });
  }

  sortPosition()
  {
    this.setState({sort:"Position"});

    var sortedPlayers = this.state.players.sort(function(a,b){
      return a.player.Position - b.player.Position;
    });

    this.setState({players: sortedPlayers});
  }

  sortName()
  {
    this.setState({sort:"Name"});

    var sortedPlayers = this.state.players.sort(function(a,b){
      return a.player.LastName - b.player.LastName;
    });

    this.setState({players: sortedPlayers});
  }

  selectPlayer(player)
  {
    this.setState({selectedPlayer : player});
  }
}

function SortButtons(props)
{
  const {sortByTeam, sortByName, sortByPosition} = props;
  return(
    <div>
      <button type="button" className="btn btn-default col-xs-4 col-md-4" onClick={props.sortByTeam}>Team</button>
      <button type="button" className="btn btn-default col-xs-4 col-md-4" onClick={props.sortByPosition}>Position</button>
      <button type="button" className="btn btn-default col-xs-4 col-md-4" onClick={props.sortByName}>Name</button>
    </div>
  );
}

function PlayerName(props)
{
  return (
    <div onClick={props.selectClick} key={props.key} className={ "player row col-xs-12 col-md-12 " + ((props.selectedPlayer.player != undefined && props.player.player.ID == props.selectedPlayer.player.ID) ? "selected" : "") } >
      <div className="col-md-3 col-xs-2">
        <div className="logo">
          <img className="img-responsive" src={"/images/Team_" + props.player.team.ID + ".svg"} />
        </div>
      </div>
      <div className="col-md-9 col-xs-10 playerName">
      {props.player.player.LastName}, {props.player.player.FirstName}<br />
      <small>{props.player.team.City} {props.player.team.Name}</small>
      </div>
    </div>
  );
}

function PlayerStats(item)
{
  if(item.selectedPlayer.player) {
    return (
        <div className={"statWindow col-md-6 team-" + item.selectedPlayer.team.ID}>
          <div className="col-md-12" className="teamLogo">
            <img src={"/images/Team_" + item.selectedPlayer.team.ID + ".svg"} />
          </div>
          <div className="col-md-4">

            <div className="playerNumber col-md-12">{item.selectedPlayer.player.JerseyNumber}</div>

            <div className="playerPosition col-md-12">{item.selectedPlayer.player.Position}</div>
          </div>
          <div className="playerName col-md-8">{item.selectedPlayer.player.FirstName} {item.selectedPlayer.player.LastName}</div>
          <div className="clearfix"></div>
          <div className="col-md-6 playerBio">
            <div className="playerAge"><small>Age:</small> {item.selectedPlayer.player.Age}</div>
            <div className="playerHeight"><small>Height:</small> {item.selectedPlayer.player.Height}</div>
            <div className="playerWeight"><small>Weight:</small> {item.selectedPlayer.player.Weight} lbs</div>
          </div>
          <div className="col-md-6 playerOrigin">
            <small>From:</small>
            <div className="playerCity">{item.selectedPlayer.player.BirthCity}</div>
            <div className="playerCountry">{item.selectedPlayer.player.BirthCountry}</div>
          </div>
        </div>
    );
  }
  else {
    return(
      <div className="statWindow col-md-6 col-xs-12">
        <img className="img-responsive col-md-12 col-xs-12" src="/images/NHL_Shield.svg" />
      </div>
    );
  }
}

export default PlayerList;
