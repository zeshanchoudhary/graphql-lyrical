import React, { Component } from 'react';

class LyricList extends Component {

  onLike(id){
    console.log("liking...", id);
  }

  renderLyrics(){
    return this.props.lyrics.map(({ content, id }) => {
        return (
        <li key={id} className="collection-item">{
          content}
          <i className="material-icons right"
             onClick={() => this.onLike(id)}>thumb_up</i>
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

export default LyricList;