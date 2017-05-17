import React from 'react';

class PlayerList extends React.Component {
  constructor() {
    super();
    this.state = {};
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
      that.setState({ players : data});
    })
  }

  render() {
    return (
      <div>
        { this.state.players}
      </div>
    );
  }
}
export default PlayerList;
