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


/* query players {
  players_by_pk(id: "1") {
    name
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

query players {
  players(order_by: {goals: desc}) {
    name
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
} */