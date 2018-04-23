import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { likeLyric } from '../queries'; 

class LyricList extends Component {

  onLike(id, currentLikes){
    this.props.mutate(
      {variables: { id },
      optimisticResponse: { // Esto es para una mejor interfaz y una buena experiencia de usuario.
        __typename: 'mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: currentLikes + 1
        }
      }
    });
  }

  renderLyrics(){
    return this.props.lyrics.map(({ content, id, likes }) => {
        return (
        <li key={id} className="collection-item">{
          content}
          <i className="material-icons right"
             onClick={() => this.onLike(id, likes)}>thumb_up</i>
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