import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { FindSong } from '../queries';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {

  constructor(props){
    super(props);
  }

  render(){
    const song = this.props.data.song;
    if (!song) return <div></div> 
    return(
      <div className="container">
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />     
        <LyricCreate id={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(FindSong, {
  // Este elemento Options se lo pasamos para que coja el id de la url
  // y lo pase al query
  options: (props) => { return {variables: {id: props.params.id} } },
})(SongDetail);