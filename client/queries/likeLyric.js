import gql from 'graphql-tag';

export default gql` 
    mutation like($id: ID!){
        likeLyric(id: $id){
        id
        likes
        }
    }
`
