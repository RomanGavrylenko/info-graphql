import { UserMutation } from './user/mutation';
import { UserQuery } from './user/query';

export const resolvers = {
    Query: {
        ...UserQuery,
    },
    Mutation: {
        ...UserMutation,
    }
}