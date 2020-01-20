import React from 'react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import FetchSongs from "../../queries/fetchSongs";
import history from "../../history";
class SongList extends React.Component {

  onSongDelete(id) {
    this.props.mutate({
      variables: {
        id,
      }
    })
    .then( res=> this.props.data.refetch())
    .catch(err=>console.log(err))
  }

  renderItem() {
    if(this.props.data.songs)
    return this.props.data.songs.map( song=>(
      <li key={song.id} className="collection-item">
        <div>
          {song.title}
          <a href="#!" className="secondary-content">
            <i
              className="material-icons"
              onClick={()=>history.push(`/songs/${song.id}`)}
            >
              edit
            </i>
            <i
              className="material-icons"
              onClick={()=>this.onSongDelete(song.id)}
            >
              delete
            </i>
          </a>
        </div>
      </li>
    ))
  }

  render() {
    if( this.props.data.loading) 
      return (
        <div> Loading ... </div>
      )
      
    return (          
      <ul className=" container collection">
        { this.renderItem() }
        <button
          className="waves-effect waves-light btn m1"
          onClick={()=>history.push("/songs/add")}>
            Add Song
        </button>
      </ul> 
    )
  }
}

const mutattion = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
      title
    }
  } 
`

export default graphql(mutattion) (
  graphql(FetchSongs)(SongList)
)
