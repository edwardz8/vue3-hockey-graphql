import gql from 'graphql-tag'

const pitcherQuery = gql`
    query pitcher($id: ID!) {
  pitcher(id: $id) {
    player
    id
    team
    wins
    strikeouts
    innings_pitched
    saves
    era 
    hits 
    walks 
    walks_per_nine 
    ks_per_nine
    home_runs_allowed
    games
    fip 
    war
    adp
  }
}
`

export default pitcherQuery