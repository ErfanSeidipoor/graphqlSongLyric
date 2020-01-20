import React from "react";
import history from "../../history";
import { graphql } from "react-apollo";
import gql  from "graphql-tag";
import FetchSongs from "../../queries/fetchSongs";

class AddSong extends React.Component {

  state = {
    title: "heat bit"
  }

  submit = e => {
    e.preventDefault()
    if (this.state.title)
      this.props
        .mutate({
          variables:{
            title:this.state.title
          },
          refetchQueries: [{query:FetchSongs }]
        })
        .then(()=>history.push('/'))
        .catch(err=>console.log(err))
  }

  render() {
    return (
      <div className="container"> 
        <button className="waves-effect waves-light btn" onClick={()=>history.push('/')}>Back</button>
        <form onSubmit={this.submit}>
          <div>
            <label>title</label>
            <input
              value={this.state.title}
              onChange={e=>this.setState({title: e.target.value})} 
            />
          </div>
          
          <button className="btn waves-effect waves-light" type="submit" name="action">Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>      
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`

export default graphql(mutation)(AddSong)