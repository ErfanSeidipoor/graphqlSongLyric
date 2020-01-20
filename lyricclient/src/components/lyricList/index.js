import React from "react";
import { graphql } from "react-apollo";
import gql  from "graphql-tag";


class LyricList extends React.Component {

  onLyriclike = (lyric) => {
    this.props.mutate({
      variables: {
        id: lyric.id
      },
      optimisticResponse: {
        likeLyric:{
          __typename: "LyricType",
          id: lyric.id,
          content: lyric.content,
          likes: lyric.likes+1,
        }
      }
    })
  }

  renderItem() {
      return this.props.lyrics.map( lyric=>(
          <li key={lyric.id} className="collection-item">
            <div>
              {lyric.content} {lyric.likes}
              <a href="#!" className="secondary-content">
                <i
                  className="material-icons"
                  onClick={()=>this.onLyriclike(lyric)}
                >
                  thumb_up
                </i>
              </a>
            </div>
          </li>
      ))
  }

  render() {
      return (
          <>
              <h5>Lyrics : </h5>
              <ul className="container collection">
                  { this.renderItem() }
              </ul> 
          </>
      )
  }
}

const mutation = gql`
  mutation likeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      content
      likes
    }
  }
`


export default graphql(mutation)(LyricList)