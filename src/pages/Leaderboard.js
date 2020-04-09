import React from "react";
import LeaderboardTable from "../components/LeaderboardTable.js";
import { Image, Container } from 'semantic-ui-react'
import Amplify, { API } from 'aws-amplify';
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

  sortArray() {
    let noScoreArray = [];
    let scoreArray = [];
    this.state.leaders.forEach(function(entry) {
      if (parseFloat(entry.score)) {
        scoreArray.push(entry)
      } else {
        noScoreArray.push(entry)
      }
    });
    return scoreArray.reverse().concat(noScoreArray);
  }

  render() {
    return (
        <Container fluid>
          <Container>
            <Image src='logo.png' size='huge' />
            <LeaderboardTable leaders={this.sortArray()} />
          </Container>
          <footer style={{ width: '100%',
                          height: '90px',
                          paddingTop: '20px',
                          paddingBottom: '20px',
                          backgroundColor: '#fff',
                          marginTop: '20px',
                          marginBottom: 0, borderTop: '#333 solid 6px' }}>
            <Image src='https://spacechallenge.tech/wp-content/uploads/2019/11/BOTTOMOFAWSNASA.jpg' size='medium' centered />
          </footer>
        </Container>          
    );

  }
}

export default Leaderboard;