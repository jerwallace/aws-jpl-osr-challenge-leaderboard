import React from "react";
import OSRLeaderboardTable from "../components/OSRLeaderboardTable.js";
import { Image, Container } from 'semantic-ui-react'
import Amplify, { API } from 'aws-amplify';
import aws_exports from "../aws-exports";
Amplify.configure(aws_exports);
let apiName = 'apid2b8bbf0';
let path = '/leaders/leaderboard';

class OSRLeaderboard extends React.Component {
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
    document.body.classList.add('osr');
    document.title = "AWS JPL Open Source Rover Challenge"
  }

  render() {
    return (
        <Container fluid className="main">
          <Container >
            <Image src='logo.png' size='huge' />
            <OSRLeaderboardTable leaders={this.state.leaders.reverse()} />
          </Container>
          <footer style={{ width: '100%',
                          height: '150px',
                          paddingTop: '50px'
                     }}>
            <Image src='sponsoredby.png' size='large' centered />
          </footer>
        </Container>          
    );

  }
}

export default OSRLeaderboard;