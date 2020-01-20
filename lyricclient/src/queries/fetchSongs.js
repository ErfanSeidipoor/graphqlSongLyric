import gql from 'graphql-tag'

export default gql`
  query getAllSongs {
    songs {
      id
      title
    }
  }
`