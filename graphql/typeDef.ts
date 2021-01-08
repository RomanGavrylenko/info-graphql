import { mergeTypeDefs } from 'graphql-tools'
import { userTypeDef } from './user/typeDef';

export const typeDefs = mergeTypeDefs([
    userTypeDef,
]);

