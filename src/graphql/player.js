import gql from 'graphql-tag'

const playerQuery = gql `
    query player($id: ID!) {
  players_by_pk(id: $id) {
    name
    id
    games
    assists
    goals
    hits
    position
    points
    id
    sog
    team
    plus_minus
  }
}
`

export default playerQuery