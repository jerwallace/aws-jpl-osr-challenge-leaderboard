import React from "react";
import { Container, Table, Icon } from 'semantic-ui-react'

class LeaderboardLanding extends React.Component {
  render() {
    return (
        <Container>
            <h1 style={{marginTop: '40px'}}>RoboMakerWorkshops.com Leaderboards</h1>
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
                        AWS JPL Open Source Rover Challenge
                      </Table.Cell>
                      <Table.Cell>
                        <a href="open-source-rover-challenge"><Icon name="dashboard" /> Open Leaderboard</a>
                      </Table.Cell>
                  </Table.Row>
            </Table.Body>
          </Table>
        </Container>          
    );

  }
}

export default LeaderboardLanding;