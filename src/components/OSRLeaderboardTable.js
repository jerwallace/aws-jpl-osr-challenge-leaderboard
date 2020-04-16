import React from 'react'
import { Table, Header, Grid, Button, Label, Container, Icon, Modal } from 'semantic-ui-react'
import { Player } from 'video-react';

class OSRLeaderboardTable extends React.Component {
  
  state = { open: false, video: { id: "", name: ""} }
  show = (video) => () => this.setState({ video, open: true })
  close = () => this.setState({ open: false })

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

  generateSimLinks(leaderID) {
    return(<Table.Cell>
          <Button.Group vertical labeled icon>
              <Button inverted compact icon='play' size='mini' onClick={this.show({id: leaderID, name: "sim1.mp4"})} content='Trial 1' />
              <Button inverted compact icon='play' size='mini' onClick={this.show({id: leaderID, name: "sim2.mp4"})} style={{borderTop:"2spx solid #222", borderBottom:"2px solid #222"}} content='Trial 2' />
              <Button inverted compact icon='play' size='mini' onClick={this.show({id: leaderID, name: "sim3.mp4"})} content='Trial 3' />
          </Button.Group>
        </Table.Cell>)
  }

  generateLogLinks(id) {
    return(<Table.Cell>
      <a href={"https://d12dhnpskrt04j.cloudfront.net/"+id+"/logs/log1.txt"} target="_blank" rel="noopener noreferrer"><Icon name="file alternate" size="small"></Icon>Log 1</a>
      <br />
      <a href={"https://d12dhnpskrt04j.cloudfront.net/"+id+"/logs/log2.txt"} target="_blank" rel="noopener noreferrer"><Icon name="file alternate" size="small"></Icon>Log 2</a>
      <br />
      <a href={"https://d12dhnpskrt04j.cloudfront.net/"+id+"/logs/log3.txt"} target="_blank" rel="noopener noreferrer"><Icon name="file alternate" size="small"></Icon>Log 3</a>
    </Table.Cell>)
  }

  render() {
    const { open, video } = this.state
    let leaders = this.props.leaders
    let i = 0
    return (
    <div>
        <Modal open={open} onClose={this.close}>
         <Modal.Header>
         <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header icon='video camera' content='Watch Simulation Trial' />
              </Grid.Column>
              <Grid.Column floated='right' style={{textAlign:"right"}}>
                  <Button
                    size='small'
                    onClick={this.close}
                    icon='close'
                  />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          </Modal.Header>
          <Modal.Content>
              <div style={{fontSize:"1.2em", fontWeight: "bold"}}> Submission: {video.id}</div>
              <Player
                playsInline
                src={"https://d12dhnpskrt04j.cloudfront.net/"+video.id+"/sim/"+video.name}
              />
          </Modal.Content>
        </Modal>
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
                      {leader.outcome!=="failed" ? this.generateLogLinks(leader.id) : <Table.Cell>None Available</Table.Cell>}
                      {leader.outcome!=="failed" ? this.generateSimLinks(leader.id) : <Table.Cell>None Available</Table.Cell>}
            </Table.Row>
            )}
        </Table.Body>
      </Table>
    </div>
    )
  }
}

export default OSRLeaderboardTable