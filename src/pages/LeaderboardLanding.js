import React from "react";
import { Container, Table, Icon, Button } from 'semantic-ui-react'

class LeaderboardLanding extends React.Component {
  componentDidMount(){
    document.body.classList.remove('osr'); 
    document.body.classList.add('main'); 
  }
  render() {
    return (
        <Container>
            <h1 style={{marginTop:"40px"}}> RoboMakerWorkshops.com Leaderboards</h1>
            <Table celled padded size="large">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Leaderboard</Table.HeaderCell>
                  <Table.HeaderCell>Link</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                  <Table.Row>
                      <Table.Cell>
                        <img alt="open source rover challenge leaderboard" src="logo_inverted.png" style={{maxHeight:"80px"}}></img>
                      </Table.Cell>
                      <Table.Cell>
                        <a href="open-source-rover-challenge"><Button icon labelPosition='left'> <Icon name="dashboard" /> Open Leaderboard</Button></a>
                      </Table.Cell>
                  </Table.Row>
            </Table.Body>
          </Table>
        </Container>          
    );

  }
}

export default LeaderboardLanding;