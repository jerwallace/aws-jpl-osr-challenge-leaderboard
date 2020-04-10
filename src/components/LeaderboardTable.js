import React from 'react'
import { Table, Label, Container, Icon, Segment } from 'semantic-ui-react'

class LeaderboardTable extends React.Component {
  constructor(props) {
    super(props);
  }
  generateLabel(n) {
    n = n + 1;
    if (n===1) { return(<Label color="yellow">#1 - Winner</Label>) }
    if (n===2) { return("") }
    else if (n===3) { return(<Label color="grey">#2 - Runner-up</Label>) }
    else {
      return(<Label>#{n-1}</Label>)
    }
  }
  generateOutcome(outcome) {
      if (outcome=="complete") {
        return(
          <Container fluid style={{ fontWeight: "bold", color:"lightgreen" }}>
            <Icon name='checkmark' /> Mission Complete!
          </Container>
        )
      } else if (outcome=="incomplete") {
        return(
          <Container fluid style={{ fontWeight: "bold", color:"orange" }}>
            <Icon name='warning sign' /> Mission Incomplete.
          </Container>
        )
      } else if (outcome=="failed") {
        return(
          <Container fluid style={{ fontWeight: "bold", color:"red" }}>
            <Icon name='window close' /> Mission Failed.
          </Container>
        )
      }
  }
  generateRank(i) {
    let rowspan = 1
    if (i==0) {
      rowspan = 2
    } else if (i==1) {
      return ("");
    }
    return (<Table.Cell width="2" rowSpan={rowspan}>{this.generateLabel(i)}</Table.Cell>)
  }
  render() {
    let leaders = this.props.leaders
    let i = 0
    return (
    <Table celled padded unstackable structured inverted size="large" >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="2" rowSpan='2'>Rank</Table.HeaderCell>
          <Table.HeaderCell width="2" rowSpan='2'>Entry ID</Table.HeaderCell>
          <Table.HeaderCell width="12" colSpan='4'>Results</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell width="2">Score</Table.HeaderCell>
          <Table.HeaderCell width="6">Summary</Table.HeaderCell>
          <Table.HeaderCell width="2">Log Files</Table.HeaderCell>
          <Table.HeaderCell width="2">Watch</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body >
          {leaders.map((leader) =>
            <Table.Row key={leader.id}>
                    {this.generateRank(i++)} 
                    <Table.Cell width="2" style={{fontSize:"12px", fontWeight: "bold", overflowWrap:"break-word"}}>
                      {leader.id}
                    </Table.Cell>
                    <Table.Cell width="2" style={{fontWeight: "bold", overflowWrap:"break-word"}}>
                      {leader.score}
                    </Table.Cell>
                    <Table.Cell width="6" style={{overflowWrap:"break-word"}}>
                      {this.generateOutcome(leader.outcome)}
                      {leader.summary}
                    </Table.Cell>
                    <Table.Cell style={{overflowWrap:"break-word"}} width="2">
                      <a href={"https://s3.amazonaws.com/opensourceroverchallenge/"+leader.id+"/logs/log1.txt"} target="_blank"><Icon name="file alternate" size="small"></Icon>Log 1</a>
                      <br />
                      <a href={"https://s3.amazonaws.com/opensourceroverchallenge/"+leader.id+"/logs/log2.txt"} target="_blank"><Icon name="file alternate" size="small"></Icon>Log 2</a>
                      <br />
                      <a href={"https://s3.amazonaws.com/opensourceroverchallenge/"+leader.id+"/logs/log3.txt"} target="_blank"><Icon name="file alternate" size="small"></Icon>Log 3</a>
                    </Table.Cell>
                    <Table.Cell style={{overflowWrap:"break-word"}} width="2">
                      <a href={"https://s3.amazonaws.com/opensourceroverchallenge/"+leader.id+"/sim/sim1.mp4"} target="_blank"><Icon name="video play" size="small"></Icon>Simulation 1</a>
                      <br />
                      <a href={"https://s3.amazonaws.com/opensourceroverchallenge/"+leader.id+"/sim/sim2.mp4"} target="_blank"><Icon name="video play" size="small"></Icon>Simulation 2</a>
                      <br />
                      <a href={"https://s3.amazonaws.com/opensourceroverchallenge/"+leader.id+"/sim/sim3.mp4"} target="_blank"><Icon name="video play" size="small"></Icon>Simulation 3</a>
                    </Table.Cell>
            </Table.Row>
          )}
      </Table.Body>
    </Table>
    )
  }
}

export default LeaderboardTable