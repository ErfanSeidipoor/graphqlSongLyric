import React from "react";
import gql from 'graphql-tag'
import { graphql } from "react-apollo";
class LyricCreate extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            content: "this is a "
        }
    }
    
    onSubmit = (e) => {
        e.preventDefault()
        this.props.mutate({
            variables: {
                id: this.props.id,
                content: this.state.content
            },
        })
        .then( res=> this.setState({content:""}))

    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h6>Add Lyric</h6>
                <label> content </label>
                <input
                    value={this.state.content}
                    onChange={e=>this.setState({content: e.target.value})}
                />
                <button className="btn waves-effect waves-light" type="submit" name="action">Add Lyric
                    <i className="material-icons right">send</i>
                </button>
            </form>
        )
    }
}

const mutation = gql`
    mutation createLyric($id: ID!, $content: String!) {
        addLyricToSong(id: $id, content: $content) {
            id
            title
            lyrics {
                id
                content
                likes
            }
        }
    }  
`

export default graphql(mutation)(LyricCreate)