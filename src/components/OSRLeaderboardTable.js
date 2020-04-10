import React from 'react'
import { Table, Label, Container, Icon } from 'semantic-ui-react'

class OSRLeaderboardTable extends React.Component {
  generateLabel(n) {
    n = n + 1;
    if (n===1) { return(<Label ribbon color="yellow">#1 - Winner</Label>) }
    if (n===2) { return(null) }
    else if (n===3) { return(<Label ribbon color="grey">#2 - Runner-up</Label>) }
    else {
      return(<Label ribbon>#{n-1}</Label>)
    }
  }
  generateOutcome(outcome) {
      if (outcome==="complete") {
        return(
          <Container fluid style={{ fontWeight: "bold", color:"lightgreen" }}>
            <Icon name='checkmark' /> Mission Complete!
          </Container>
        )
      } else if (outcome==="incomplete") {
        return(
          <Container fluid style={{ fontWeight: "bold", color:"orange" }}>
            <Icon name='warning sign' /> Mission Incomplete.
          </Container>
        )
      } else if (outcome==="failed") {
        return(
          <Container fluid style={{ fontWeight: "bold", color:"red" }}>
            <Icon name='window close' /> Mission Failed.
          </Container>
        )
      }
  }
  generateRank(i) {
    if (i===0) {
      return (<Table.Cell rowSpan='2'>{this.generateLabel(i)}</Table.Cell>)
    } else if (i===1) {
      return (null);
    } else {
      return (<Table.Cell>{this.generateLabel(i)}</Table.Cell>)
    }
  }
  render() {
    let leaders = this.props.leaders
    let i = 0
    return (
    <Table celled padded inverted size="large" style={{borderStyle: 'collapse'}}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan='2'>Rank</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Entry</Table.HeaderCell>
          <Table.HeaderCell colSpan='4'>Results</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Score</Table.HeaderCell>
          <Table.HeaderCell>Summary</Table.HeaderCell>
          <Table.HeaderCell>Log Files</Table.HeaderCell>
          <Table.HeaderCell>Watch</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
          {leaders.map((leader) =>
            <Table.Row key={leader.id}>
                    {this.generateRank(i++)} 
                    <Table.Cell style={{fontSize: "12px"}} fixed>
                      {leader.id}
                    </Table.Cell>
                    <Table.Cell style={{fontWeight: "bold"}} fixed>
                      {leader.score}
                    </Table.Cell>
                    <Table.Cell>
                      {this.generateOutcome(leader.outcome)}
                      {leader.summary}
                    </Table.Cell>
                    <Table.Cell>
                      <a href={"https://s3.amazonaws.com/opensourceroverchallenge/"+leader.id+"/logs/log1.txt"} target="_blank" rel="noopener noreferrer"><Icon name="file alternate" size="small"></Icon>Log 1</a>
                      <br />
                      <a href={"https://s3.amazonaws.com/opensourceroverchallenge/"+leader.id+"/logs/log2.txt"} target="_blank" rel="noopener noreferrer"><Icon name="file alternate" size="small"></Icon>Log 2</a>
                      <br />
                      <a href={"https://s3.amazonaws.com/opensourceroverchallenge/"+leader.id+"/logs/log3.txt"} target="_blank" rel="noopener noreferrer"><Icon name="file alternate" size="small"></Icon>Log 3</a>
                    </Table.Cell>
                    <Table.Cell>
                      <a href={"https://s3.amazonaws.com/opensourceroverchallenge/"+leader.id+"/sim/sim1.mp4"} target="_blank" rel="noopener noreferrer"><Icon name="video play" size="small"></Icon>Simulation 1</a>
                      <br />
                      <a href={"https://s3.amazonaws.com/opensourceroverchallenge/"+leader.id+"/sim/sim2.mp4"} target="_blank" rel="noopener noreferrer"><Icon name="video play" size="small"></Icon>Simulation 2</a>
                      <br />
                      <a href={"https://s3.amazonaws.com/opensourceroverchallenge/"+leader.id+"/sim/sim3.mp4"} target="_blank" rel="noopener noreferrer"><Icon name="video play" size="small"></Icon>Simulation 3</a>
                    </Table.Cell>
            </Table.Row>
          )}
      </Table.Body>
    </Table>
    )
  }
}

export default OSRLeaderboardTable