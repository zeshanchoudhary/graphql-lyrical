import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { likeLyric } from '../queries'; 

class LyricList extends Component {

  onLike(id){
    this.props.mutate({variables: { id }})
  }

  renderLyrics(){
    return this.props.lyrics.map(({ content, id, likes }) => {
        return (
        <li key={id} className="collection-item">{
          content}
          <i className="material-icons right"
             onClick={() => this.onLike(id)}>thumb_up</i>
          <span className="badge badge-pill badge-primary">{likes}</span>
        </li>
        );
    });
  }

  render(){
    const lyrics = this.props.lyrics;
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul> 
    )
  }
} 

export default graphql(likeLyric)(LyricList);