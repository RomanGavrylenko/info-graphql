import { gql } from 'apollo-server';

export const userTypeDef = gql`
    type User {
        id: ID!
        username: String!
        password: String!
        email: String
        createdAt: String
        token: String
        refreshToken: String
    }

    input UserInput {
        username: String!
        password: String!
    }

    type Query {
        getUser(id: ID): User
    }

    type Mutation {
        registration(regData: UserInput): User
        login(loginData: UserInput): User
        logout(id: ID!): Boolean
    }
`;