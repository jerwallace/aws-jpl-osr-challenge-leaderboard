import React from "react";
import OSRLeaderboardTable from "../components/OSRLeaderboardTable.js";
import { Image, Container, Dimmer } from 'semantic-ui-react'
import Amplify, { API } from 'aws-amplify';
import ReactLoading from "react-loading";
import aws_exports from "../aws-exports";
Amplify.configure(aws_exports);
let apiName = 'api335d2c0c';
let path = '/submissions/leaderboard/SUBMISSION';

class OSRLeaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: []
    }
  }
  componentDidMount(){
    API.get(apiName, path).then(response => {
      console.log(response.reverse())
      this.setState({leaders: response})

    });
    document.body.classList.add('osr'); 
    document.title = "AWS JPL Open Source Rover Challenge"
  }
  render() {
    return (
      <div>{this.state.leaders.length ===  0 ? 
      <Container fluid>
        <Dimmer active>
          <ReactLoading type={"bars"} color={"white"} />
        </Dimmer>
      </Container>
      :
        <Container fluid>
          <Container >
            <Image src='/logo.png' size='huge' />
            
            <OSRLeaderboardTable leaders={this.state.leaders} />
          </Container>
          <footer style={{ width: '100%',
                          height: '200px',
                          paddingTop: '50px'
                     }}>
            <Image src='/sponsoredby.png' size='large' centered />
          </footer>
        </Container>
        }
      </div>          
    );

  }
}

export default OSRLeaderboard;