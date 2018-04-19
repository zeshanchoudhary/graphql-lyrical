import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag'; // for writing queries
import { graphql, compose } from 'react-apollo'; // for binding queries to component
import { fetchSongs, DeleteSongs } from '../queries';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../style/style.css';



class SongsList extends Component {
  constructor(props) {
    super(props);
  }

  onSongDelete(id) {
    this.props.DeleteSongs({
      variables: { id },
      refetchQueries: [{query: fetchSongs}] // refetch all the Songs Again
    });
  }

  displaySongs() {
    const data = this.props.fetchSongs;
    if (data.loading) {
      return (<div>Loading Songs...</div>)
    } else {
      return data.songs.map(({id, title}) => {
        return (
          <li className="collection-item" key={id}>
          {title}
          <i 
            className="material-icons right"
            onClick={() => this.onSongDelete(id)}
          >delete</i>
          </li>
        );
      })
    }
  }

  render() {
    const transitionOptions = {
      transitionName: 'fade',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500
    }

    return (
      <div>
        <ul className="collection">
          <ReactCSSTransitionGroup {...transitionOptions}>
            {this.displaySongs()}
          </ReactCSSTransitionGroup>
        </ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

export default compose(
  graphql(fetchSongs, {name: "fetchSongs"}),
  graphql(DeleteSongs, {name: "DeleteSongs"})
)(SongsList);
