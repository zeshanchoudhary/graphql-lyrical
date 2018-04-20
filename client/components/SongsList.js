import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag'; // for writing queries
import { graphql, compose } from 'react-apollo'; // for binding queries to component
import { fetchSongs, DeleteSongs } from '../queries';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SongsList extends Component {
  constructor(props) {
    super(props);
  }

  onSongDelete(id) {
    /* Aqui hemos llamado a props.refetch()
       refetch solo lo podemos llamar si el Query esta asociado
       al componente del que estas llamando.
    */
    this.props.DeleteSongs({
      variables: { id }
    }).then(() => this.props.fetchSongs.refetch());
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
          <Link to={`songs/${id}`}>
            <i 
              className="material-icons right">info</i>
          </Link>
            <i 
              className="material-icons add right"
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
