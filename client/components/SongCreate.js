import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { fetchSongs, AddSongsMutation } from '../queries';

class SongCreate extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      title: ''
    }
  }

  obSubmit(e){
    e.preventDefault();
    
    // Llamamos a la funcion para que haga la mutacion.
    this.props.mutate({
      variables: { title: this.state.title },
        refetchQueries: [{query: fetchSongs}] // es6 las dos palabras son iguales.
    }).then(() => hashHistory.push('/'));
  }

  render(){
    return(
      <div className="container">
        <Link to="/">Back</Link>
        <h2>Create a new Song</h2>
        <form onSubmit={this.obSubmit.bind(this)}>
          <label>Song Title:</label>
          <input 
            onChange={event => this.setState({title: event.target.value})}
            value={this.state.title} 
            />
          <button type="submit" className="btn-large green right">Add</button>
        </form>
      </div>
    );
  }
}



export default graphql(AddSongsMutation)(SongCreate);