import React from 'react'
import { Responsive, Table, Header, Grid, Button, Label,Icon, Modal, Popup } from 'semantic-ui-react'
import { Player } from 'video-react';

class OSRLeaderboardTable extends React.Component {
  
  state = { open: false, video: { id: "", name: ""} }
  show = (video) => () => this.setState({ video, open: true })
  close = () => this.setState({ open: false })

  generateLabel(n) {
    n = n + 1;
    if (n===1) { return(<Label ribbon color="yellow">#1 - Winner</Label>) }
    if (n===2) { return(null) }
    else if (n===3) { return(<Label ribbon color="grey">#2 - Runner Up</Label>) }
    else {
      return(<Label ribbon>#{n-1}</Label>)
    }
  }
  generateOutcome(outcome) {
      if (outcome==="complete") {
        return(
          <Icon name='checkmark' alt='Mission Complete!' />
        )
      } else if (outcome==="incomplete") {
        return(
            <Icon name='warning sign' alt='Mission Incomplete.'/> 
        )
      } else if (outcome==="failed") {
        return(
            <Icon name='window close' alt='Mission Failed.'/> 
        )
      }
  }
  generateRank(i, outcome) {
    if (i===0) {
      return (<Table.Cell disabled rowSpan="4">{this.generateLabel(i)}</Table.Cell>)
    } else if (i===1) {
      return (<Table.Cell disabled rowSpan="4" style={{border:"none"}}></Table.Cell>);
    } else {
      return (<Table.Cell disabled rowSpan="4">{this.generateLabel(i)}</Table.Cell>)
    }
  }

  generateSimLinks(leaderID, trial) {
    return(
      <Button inverted style={{minWidth:"60px"}} onClick={this.show({id: leaderID, name: "sim"+trial+".mp4"})} icon>
        <Icon name='play' />
    </Button>)
  }

  generateLogLinks(id, trial) {
    return(<a href={'https://d12dhnpskrt04j.cloudfront.net/'+id+'/logs/log'+trial+'.txt'} rel="noopener noreferrer" target="_blank"><Button type='submit' inverted style={{minWidth:"60px"}} icon>
      <Icon name='download' />
    </Button></a>)
  }

  round(val) {
    return Math.round(val * 100)/100
  }

  getColor(outcome) {
    if (outcome==='failed') {
      return "red";
    } else if (outcome==='incomplete') {
      return "orange";
    } else {
      return "green";
    }
  }

  render() {
    const { open, video } = this.state
    let leaders = this.props.leaders
    let i = 0
    return (
    <div>
        <Modal inverse open={open} onClose={this.close}>
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
      <Table selectable compact='very' structured celled padded inverted size="large" >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell rowSpan="2"><Icon name='numbered list' /> Rank</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2"><Icon name='user' /> Entry</Table.HeaderCell>
            <Table.HeaderCell colSpan="8"><Icon name='align justify'  /> Results  <span style={{color:"#888", fontWeight:"200"}}> - 3 trials per submission</span></Table.HeaderCell>
          </Table.Row>
            <Table.Row verticalAlign='top' style={{textAlign:"center"}}>
            <Popup inverted position='top center' on="hover" trigger={<Table.HeaderCell><Icon name="checkmark" color='grey' /></Table.HeaderCell>} content="Mission status. Hover your mouse cursor over a trial to get a full summary of what happened."></Popup>
              <Popup inverted position='top center' on="hover" trigger={<Table.HeaderCell><Icon name='trophy' color='grey'/> <br />Score</Table.HeaderCell>} content="The score is calculated by the measurement from the IMU, number of timesteps taken and distance from the checkpoint."></Popup>
              <Popup inverted position='top center' on="hover" trigger={<Table.HeaderCell><Icon name='move' color='grey'/> <br />Max IMU</Table.HeaderCell>} content="Inertial measurement units detect the force, angular rate and orientation of the rover. This determines how difficult the chosen path was and is factored into the final score."></Popup>
              <Popup inverted position='top center' on="hover" trigger={<Table.HeaderCell><Icon name='map pin' color='grey' />  <br />Distance</Table.HeaderCell>} content="The final distance between the rover and the checkpoint (in meters)."></Popup>
              <Popup inverted position='top center' on="hover" trigger={<Table.HeaderCell><Icon name='clock' color='grey'/> <br />Timesteps</Table.HeaderCell>} content="The amount of time consumed when the rover reached the checkpoint or sustained irrecoverable damage. The max amount of timesteps alloted were 265."></Popup>
              <Popup inverted position='top center' on="hover" trigger={<Table.HeaderCell><Icon name='power off' color='grey'/> <br />Power Left</Table.HeaderCell>} content="The amount of power left after the rover reached the checkpoint or sustained irrecoverable damage. If this value is zero, it means the rover's power source ran out."></Popup>
              <Popup inverted position='top center' on="hover" trigger={<Table.HeaderCell><Icon name='file' color='grey'/> <br />Full Log </Table.HeaderCell>} content="Download the entire log."></Popup>
              <Popup inverted position='top center' on="hover" trigger={<Table.HeaderCell><Icon name='video' color='grey'/> <br />Watch </Table.HeaderCell>} content="Replay the simulation from start to finish!"></Popup>
            </Table.Row>
        </Table.Header>
            {leaders.map((leader) =>
            <Table.Body>
                {leader.trials.length === 0 ? 
                  <Table.Row key={leader.id}>
                        {this.generateRank(i++, leader.outcome)} 
                        <Table.Cell disabled style={{fontWeight:"bold", color:"#fff"}}>
                          {leader.name}
                          <div style={{color:"#666", fontWeight:"200"}}>Submission ID: {leader.id}</div>
                        </Table.Cell>
                        <Table.Cell disabled style={{background: this.getColor(leader.outcome), color:"#fff" }} >
                                {this.generateOutcome(leader.outcome) }
                              </Table.Cell>
                        <Table.Cell disabled colSpan="5" style={{color:"#fff"}}>{leader.overallSummary}</Table.Cell> 
                        <Table.Cell disabled colSpan="2" style={{color:"#fff"}}>No data.</Table.Cell> 
                  </Table.Row> : 
                  <Table.Row key={leader.id}>
                        {this.generateRank(i++, leader.outcome)} 
                        <Table.Cell disabled rowSpan="4" style={{fontWeight:"bold", color:"#fff"}}>
                          {leader.name}
                          <div style={{color:"#666", fontWeight:"200"}}>Submission ID: {leader.id}</div>
                        </Table.Cell>
                  </Table.Row> }
                  {leader.trials.length > 0 ? leader.trials.sort((a, b) => (a.score < b.score) ? 1 : -1).map((trial) => 
                  <Popup wide position='top center' on="hover" mouseEnterDelay={800} trigger={<Table.Row key={leader.id+"-"+trial.num}>
                              <Table.Cell style={{background: this.getColor(trial.outcome) }} >
                                {this.generateOutcome(trial.outcome) }
                                <Responsive style={{float:"right"}}  {...Responsive.onlyMobile}>
                                    Trial {trial.num}: Mission {trial.outcome}
                                </Responsive>
                              </Table.Cell>
                              <Table.Cell style={{fontWeight:"bold"}}>
                              <Responsive {...Responsive.onlyMobile}>
                               Score: 
                              </Responsive>
                              {this.round(trial['score']) }
                              </Table.Cell>
                              <Table.Cell>
                              <Responsive {...Responsive.onlyMobile}>
                               Max IMU: 
                              </Responsive>
                                {this.round(trial['data']['maxIMU']) }
                              </Table.Cell>
                             <Table.Cell>
                             <Responsive  {...Responsive.onlyMobile}>
                               Distance From Checkpoint (m):
                              </Responsive>
                                {this.round(trial['distanceFromGoal']) }
                              </Table.Cell>
                             <Table.Cell>
                             <Responsive  {...Responsive.onlyMobile}>
                               Timesteps:
                              </Responsive>
                                {trial['data']['timesteps'] }
                              </Table.Cell>
                              <Table.Cell>
                              <Responsive {...Responsive.onlyMobile}>
                               Power Left:
                              </Responsive>
                                {trial['data']['powerSupplyLeft'] }
                              </Table.Cell>
                              <Table.Cell>
                                {this.generateLogLinks(leader.id, trial['num'])}
                              </Table.Cell>
                              <Table.Cell>
                                {this.generateSimLinks(leader.id, trial['num'])}
                              </Table.Cell>
                </Table.Row>}>
                  <div style={{float:"right", fontWeight:"bold", fontSize:"10px", color:"#666"}}>
                    TRIAL {trial.num}
                  </div>
                  <div style={{color:this.getColor(trial.outcome), fontWeight:"bold"}}>
                    {this.generateOutcome(trial.outcome)}
                    {trial.outcome==="complete" ? "Mission Complete!" : "Misson incomplete." }
                  </div>
                  <div>
                    {trial.summary}
                  </div>
                </Popup>)
                  : null }
            </Table.Body>
            )}
      </Table>
    </div>
    )
  }
}

export default OSRLeaderboardTable