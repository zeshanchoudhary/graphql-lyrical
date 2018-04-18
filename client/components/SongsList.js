import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag'; // for writing queries
import { graphql } from 'react-apollo'; // for binding queries to component

const query = gql`
{
    songs{
        id
        title
    }
}`;


class SongsList extends Component {
  constructor(props) {
    super(props);
  }

  displaySongs() {
    const data = this.props.data;
    if (data.loading) {
      return (<div>Loading Songs...</div>)
    } else {
      return data.songs.map(song => {
        return (
          <li className="collection-item" key={song.id}>{song.title}</li>
        );
      })
    }
  }

  render() {
    return (
      <ul className="collection">
        {this.displaySongs()}
      </ul>
    )
  }
}

export default graphql(query)(SongsList); // binding query to component