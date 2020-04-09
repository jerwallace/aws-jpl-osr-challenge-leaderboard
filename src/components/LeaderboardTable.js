import React from 'react'
import { Table, Label } from 'semantic-ui-react'

class LeaderboardTable extends React.Component {
  constructor(props) {
    super(props);
  }
  generateLabel(n) {
    if (n===1) { return(<Label ribbon color="yellow">#1 - Winner</Label>) }
    else if (n===2) { return(<Label ribbon color="grey">#2 - Runner-up</Label>) }
    else {
      return(<Label ribbon>#{n}</Label>)
    }
  }
  render() {
    let leaders = this.props.leaders
    console.log()
    let i = 1
    return (
    <Table celled padded inverted size="large">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={3}>Rank</Table.HeaderCell>
          <Table.HeaderCell>Entry</Table.HeaderCell>
          <Table.HeaderCell>Score</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
          {leaders.map((leader) =>
            <Table.Row key={leader.id}>
                    <Table.Cell>
                      {this.generateLabel(i++)}
                    </Table.Cell>
                    <Table.Cell>
                      {leader.id}
                    </Table.Cell>
                    <Table.Cell>
                      {leader.score}
                    </Table.Cell>
            </Table.Row>
          )}
      </Table.Body>
    </Table>
    )
  }
}

export default LeaderboardTable