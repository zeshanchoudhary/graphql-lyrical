import gql from 'graphql-tag';

const addSongMutation = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title){
      title
    }
  }
`;

export default addSongMutation;