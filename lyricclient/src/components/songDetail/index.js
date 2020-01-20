import React from "react";
import { graphql } from "react-apollo";
import  fetchSong  from "../../queries/fetchSong";
import LyricCreate from "../LyricCreate";
import LyricList from "../lyricList";
import history from "../../history";

class SongDetail extends React.Component {

  render(){
    const {
      loading,
      song,
    } = this.props.data

    if (loading)
      return (
        <div>
          Loading...
        </div>
      )
 
    return (
      <div className="container"> 
        <button className="waves-effect waves-light btn" onClick={()=>history.push('/')}>Back</button>
        <h5>Title: {song.title}</h5>
        <LyricList lyrics={song.lyrics}/>
        <LyricCreate id={this.props.match.params.id} />

      </div>
    )
  }
}

export default graphql(
  fetchSong, {
  options: (props) => {
    return {
      variables: {
        id: props.match.params.id
      }
    }
  }
})(SongDetail)