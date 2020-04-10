import React from "react";
import LeaderboardTable from "../components/LeaderboardTable.js";
import { Image, Container } from 'semantic-ui-react'
import Amplify, { API, autoShowTooltip } from 'aws-amplify';
import aws_exports from "../aws-exports";
Amplify.configure(aws_exports);
let apiName = 'apid2b8bbf0';
let path = '/leaders/leaderboard';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: []
    }
  }
  componentDidMount(){
    API.get(apiName, path).then(response => {
      this.setState({leaders: response})
    });
  }

  render() {
    return (
        <Container fluid>
          <Container style={{height: "calc(100vh - 240px)"}}>
            <Image src='logo.png' size='huge' />
            <LeaderboardTable leaders={this.state.leaders.reverse()} />
          </Container>
          <footer class="footer">
            <Image src='sponsoredby.png' size="large" centered />
          </footer>
        </Container>          
    );

  }
}

export default Leaderboard;