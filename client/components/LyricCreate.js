import React, { Component } from 'react';
import { AddLyricToSong, FindSong } from '../queries';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      content: '',
    }
    
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e){
    e.preventDefault();    
    // hacemos Mutacion
    this.props.mutate({
      variables: { 
        content: this.state.content, 
        songId: this.props.id 
      }
    }).then(() => this.setState({content: ''}));;

    // this.setState({content: ''});

  }

  render(){
    return(
      <form onSubmit={this.onSubmit}>
        <label>Add a lyric</label>
        <input type="text" value={this.state.content} onChange={(e) => this.setState({content: e.target.value})} />
      </form>
    )
  }
}

export default graphql(AddLyricToSong)(LyricCreate);